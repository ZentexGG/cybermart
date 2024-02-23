import axios from "axios";
import { useState, useEffect } from "react";
import { Order } from "../../types";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../authChecker";
import Loader from "../../Pages/Loader/Loader";
import { BsBox } from "react-icons/bs";

export default function UserOrdersComponent() {
  const [orders, setOrders] = useState<Order[]>();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const user = await checkAuth();
    if (!user) {
      navigate("/not-found");
    }
    if (typeof user !== "boolean") {
      setUserId(user.id);
    } else {
      navigate("/not-found");
    }
  };

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      if (userId !== null) {
        const response = await axios.get(`/api/orders/user/${userId}`);
        setOrders(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
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

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-5">
      {loading ? (
        <Loader />
      ) : orders && orders?.length > 0 ? (
        <div className="w-full max-w-2xl">
          {orders?.map((order: Order, index: number) => (
            <div key={index} className="mb-8">
              <div className="bg-white shadow-lg rounded-md overflow-hidden">
                <div className="p-4">
                  <p className="text-lg font-semibold mb-2">
                    Full Name: {order.firstName} {order.lastName}
                  </p>
                  <p className="text-sm text-gray-600">Order ID: #{order.id}</p>
                  <p className="text-sm text-gray-600">
                    Address: {order.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    Country: {order.country}
                  </p>
                  <p className="text-sm text-gray-600">City: {order.city}</p>
                  <p className="text-sm text-gray-600">
                    Region: {order.region}
                  </p>
                  <p className="text-sm text-gray-600">
                    Postal Code: {order.postalCode || "-"}
                  </p>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.orderProducts.map((product) => (
                      <div
                        key={product.product?.id}
                        className="bg-gray-100 p-3 rounded-md"
                      >
                        <a
                          href={`/products/${product.product?.id}`}
                          className="text-red-900 font-semibold text-lg mb-2"
                        >
                          {product.product?.name}
                        </a>
                        <p className="text-sm text-gray-600">
                          {product.product?.price}€ x {product.amount} pcs
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-100 border-t border-gray-200">
                  <p className="font-semibold text-lg">
                    Total Price: {getOrderTotalPrice(order)}€
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="max-w-2xl bg-white shadow-lg rounded-md overflow-hidden p-4">
            <div className="flex items-center justify-center mb-4">
              <BsBox className="text-4xl text-gray-600 mr-2" />
              <p className="text-lg font-semibold">No Orders Found</p>
            </div>
            <p className="text-gray-600">
              It looks like you don't have any orders yet. Start shopping and
              place your first order!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
