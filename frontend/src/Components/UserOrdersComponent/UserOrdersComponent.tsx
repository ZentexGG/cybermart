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

  return (
    <div className="w-full min-h-screen flex items-center justify-center my-5">
      <div className="w-2/3 h-1/4 border-2 border-black bg-slate-100 p-4">
        {orders?.map((order: Order, index: number) => (
          <div
            key={index}
            className="border-2 border-black p-2 flex flex-col mb-4">
            <p>Order Country: {order.country}</p>
            <p>Order City: {order.region}</p>
            <p>Name: {order.firstName + " " + order.lastName}</p>
            <div className="flex flex-row">
              {order.orderProducts.map((product) => (
                <div key={product.product?.id} className="p-1">{product.product?.id}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
