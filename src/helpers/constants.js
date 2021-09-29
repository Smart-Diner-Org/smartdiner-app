export const deliveryStageStatus = {
  1: "Looking for a delivery person",
  2: "Delivery person details:",
  3: "Delivery got rejected",
  4: "Delivery reassigned",
  5: "Delivery completed",
  6: "Successfully Delivered",
  7: "Undelivered",
  8: "Delivery person reached store",
  9: "Order got picked from the store",
  10: "Delivery person reached customer place to deliver",
  11: "Delivery person cancelled"
}

export const roleIDs = {
  "superAdmin": 1,
  "admin": 2,
  "deliveryAgent": 3,
  "customer": 4,
  "smartDinerSuperAdmin": 5,
  "deliveryPartnerAdmin": 6
};

export const deliveryPreferences = {
  "inHouse": "1",
  "service": "2",
  "all": "3",
};

export const paymentStatuses = {
  "paid": 1,
  "notPaid": 2,
  "paymentFailed": 3,
  "paymentRequestFailed": 4,
};

export const paymentTypes = {
    "cashOnDelivery": 1,
    "onlinePayment": 2
};

export const paymentStatuseText = {
  1: "Paid",
  2: "Not Paid",
  3: "Payment Failed",
  4: "Payment Request Failed",
};