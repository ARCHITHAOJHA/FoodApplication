package com.ojha.Foodzz.Service;

import com.razorpay.RazorpayException;
import com.ojha.Foodzz.model.Order;
import com.ojha.Foodzz.response.PaymentResponse;

public interface PaymentService  {

    PaymentResponse createPaymentLink(Order order) throws RazorpayException;
}
