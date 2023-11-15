import axios from "axios";
import { useState, useEffect } from "react";
import { Order } from "../../types";
import { useParams } from "react-router-dom";

export default function UserOrdersComponent() {
  const [orders, setOrders] = useState<Order[]>();
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`/api/orders/user/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserOrders();
  }, [userId]);

  const getOrderTotalPrice = (order: Order) => {
    return order.orderProducts.reduce((total, product) => {
      if (product.product && typeof product.product.price === "number") {
        return total + product.amount * product.product.price;
      }
      return total;
    }, 0);
  };

  return orders && orders?.length > 0 ? (
    <div className="w-full min-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-2xl border-2 border-black bg-slate-100 p-4">
        {orders?.map((order: Order, index: number) => (
          <div key={index} className="border-2 border-black p-4 mb-4">
            <p className="text-lg font-semibold mb-2">
              Full Name: {order.firstName} {order.lastName}
            </p>
            <p>Order ID: #{order.id}</p>
            <p>Address: {order.address}</p>
            <p>Country: {order.country}</p>
            <p>City: {order.city}</p>
            <p>Region: {order.region}</p>
            <p>Postal Code: {order.postalCode || "-"}</p>
            <div className="mt-4">
              {order.orderProducts.map((product) => (
                <div
                  key={product.product?.id}
                  className="mb-2 flex justify-between"
                >
                  <p className="font-semibold">{product.product?.name}</p>
                  <div>
                    <p className="text-sm">
                      {product.product?.price}€ x {product.amount} pcs
                    </p>
                  </div>
                </div>
              ))}
              <p className="font-semibold mt-2">
                Total Price: {getOrderTotalPrice(order)}€
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="max-w-2xl border-2 border-black bg-slate-100 p-4">
        <p className="text-lg font-semibold mb-2">No Orders Found</p>
        <p className="text-gray-600">
          It looks like you don't have any orders yet. Start shopping and place
          your first order!
        </p>
      </div>
    </div>
  );
}
