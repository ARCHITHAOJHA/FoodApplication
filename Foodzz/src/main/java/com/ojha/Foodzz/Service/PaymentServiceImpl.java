package com.ojha.Foodzz.Service;

import com.ojha.Foodzz.model.Order;
import com.ojha.Foodzz.response.PaymentResponse;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService{


    @Override
    public PaymentResponse createPaymentLink(Order order) {
        String paymentUrl = "http://localhost:3000/payment/checkout/" + order.getId();

        PaymentResponse res = new PaymentResponse();
        res.setPayment_url(paymentUrl);

        return res;


    }
}
