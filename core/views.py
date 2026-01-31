from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.utils import timezone

from .models import Customer, Loan
from .serializers import CustomerSerializer, LoanEligibilitySerializer


class RegisterCustomer(APIView):
    def post(self, request):
        data = request.data
        monthly_salary = data.get('monthly_salary')

        if monthly_salary is None:
            return Response(
                {"error": "monthly_salary is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            monthly_salary = int(monthly_salary)
        except ValueError:
            return Response(
                {"error": "monthly_salary must be a number"},
                status=status.HTTP_400_BAD_REQUEST
            )

        approved_limit = round(36 * monthly_salary)

        serializer = CustomerSerializer(data=data)
        if serializer.is_valid():
            customer = serializer.save(approved_limit=approved_limit)
            return Response(
                CustomerSerializer(customer).data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CheckEligibility(APIView):
    def post(self, request):
        serializer = LoanEligibilitySerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        customer = get_object_or_404(Customer, id=data['customer_id'])

        loan_amount = data['loan_amount']
        interest_rate = data['interest_rate']
        tenure = data['tenure']

        past_loans = Loan.objects.filter(customer=customer)
        total_current_loans = sum(
            loan.loan_amount for loan in past_loans if loan.end_date is None
        )
        loans_paid_on_time = sum(
            1 for loan in past_loans if loan.emis_paid_on_time >= loan.tenure
        )
        num_loans_taken = past_loans.count()

        credit_score = 50
        credit_score += loans_paid_on_time * 5
        credit_score -= num_loans_taken * 2

        if total_current_loans > customer.approved_limit:
            credit_score = 0

        corrected_interest_rate = interest_rate
        approve = False

        if credit_score > 50:
            approve = True
        elif 30 < credit_score <= 50:
            corrected_interest_rate = max(interest_rate, 12)
            approve = True
        elif 10 < credit_score <= 30:
            corrected_interest_rate = max(interest_rate, 16)
            approve = True

        monthly_emi = (loan_amount * (1 + corrected_interest_rate / 100)) / tenure
        if monthly_emi > 0.5 * customer.monthly_salary:
            approve = False

        return Response({
            "customer_id": customer.id,
            "approval": approve,
            "interest_rate": interest_rate,
            "corrected_interest_rate": corrected_interest_rate,
            "tenure": tenure,
            "monthly_installment": round(monthly_emi, 2)
        })


class CreateLoan(APIView):
    def post(self, request):
        serializer = LoanEligibilitySerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        customer = get_object_or_404(Customer, id=data['customer_id'])

        loan_amount = data['loan_amount']
        interest_rate = data['interest_rate']
        tenure = data['tenure']

        # ---- Credit score calculation ----
        past_loans = Loan.objects.filter(customer=customer)

        total_current_loans = sum(
            loan.loan_amount for loan in past_loans if loan.end_date is None
        )

        loans_paid_on_time = sum(
            1 for loan in past_loans if loan.emis_paid_on_time >= loan.tenure
        )

        num_loans_taken = past_loans.count()

        credit_score = 50
        credit_score += loans_paid_on_time * 5
        credit_score -= num_loans_taken * 2

        if total_current_loans > customer.approved_limit:
            credit_score = 0

        corrected_interest_rate = interest_rate
        approve = False

        if credit_score > 50:
            approve = True
        elif 30 < credit_score <= 50:
            corrected_interest_rate = max(interest_rate, 12)
            approve = True
        elif 10 < credit_score <= 30:
            corrected_interest_rate = max(interest_rate, 16)
            approve = True

        # ---- EMI calculation ----
        monthly_emi = (loan_amount * (1 + corrected_interest_rate / 100)) / tenure

        if monthly_emi > 0.5 * customer.monthly_salary:
            approve = False

        if not approve:
            return Response({
                "loan_id": None,
                "customer_id": customer.id,
                "loan_approved": False,
                "message": "Loan not approved based on credit eligibility or EMI limit",
                "monthly_installment": round(monthly_emi, 2)
            }, status=status.HTTP_200_OK)

        # ✅ FIX IS HERE: monthly_repayment added
        loan = Loan.objects.create(
          customer=customer,
          loan_amount=loan_amount,
          interest_rate=corrected_interest_rate,
          tenure=tenure,
          monthly_repayment=monthly_emi,   
          emis_paid_on_time=0,
          start_date=timezone.now().date(),
          end_date=None                    
)


        return Response({
            "loan_id": loan.id,
            "customer_id": customer.id,
            "loan_approved": True,
            "message": "Loan approved",
            "monthly_installment": round(monthly_emi, 2)
        }, status=status.HTTP_201_CREATED)


class ViewLoan(APIView):
    def get(self, request, loan_id):
        loan = get_object_or_404(Loan, id=loan_id)

        customer = loan.customer
        monthly_installment = (
            loan.loan_amount * (1 + loan.interest_rate / 100)
        ) / loan.tenure

        return Response({
            "loan_id": loan.id,
            "customer": {
                "id": customer.id,
                "first_name": customer.first_name,
                "last_name": customer.last_name,
                "phone_number": customer.phone_number,
                "age": customer.age
            },
            "loan_amount": loan.loan_amount,
            "interest_rate": loan.interest_rate,
            "monthly_installment": round(monthly_installment, 2),
            "tenure": loan.tenure
        })


class ViewLoansByCustomer(APIView):
    def get(self, request, customer_id):
        customer = get_object_or_404(Customer, id=customer_id)

        loans = Loan.objects.filter(customer=customer)
        result = []

        for loan in loans:
            monthly_installment = (
                loan.loan_amount * (1 + loan.interest_rate / 100)
            ) / loan.tenure

            repayments_left = max(
                loan.tenure - loan.emis_paid_on_time, 0
            )

            result.append({
                "loan_id": loan.id,
                "loan_amount": loan.loan_amount,
                "interest_rate": loan.interest_rate,
                "monthly_installment": round(monthly_installment, 2),
                "repayments_left": repayments_left
            })

        return Response(result)
