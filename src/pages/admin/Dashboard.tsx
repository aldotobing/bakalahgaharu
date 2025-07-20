import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '@/services/productService';
import AdminHeader from '../../components/admin/AdminHeader';
import { Loader2 } from 'lucide-react';
import {
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
} from 'lucide-react';

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('authToken') || undefined;
        const { products } = await fetchProducts(token);
        setProductCount(products.length);
      } catch (error) {
        console.error('Error fetching product count:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const stats = [
    { 
      name: 'Total Products', 
      stat: isLoading ? '...' : productCount.toString(), 
      icon: Package, 
      change: '', 
      changeType: 'increase',
      link: '/admin/products'
    },
    { 
      name: 'Total Revenue', 
      stat: '$405,091.00', 
      icon: DollarSign, 
      change: '+4.75%', 
      changeType: 'increase' 
    },
    { 
      name: 'New Orders', 
      stat: '1,342', 
      icon: ShoppingCart, 
      change: '+12.1%', 
      changeType: 'increase' 
    },
    { 
      name: 'New Customers', 
      stat: '89', 
      icon: Users, 
      change: '-1.2%', 
      changeType: 'decrease' 
    },
  ];

  const recentActivities = [
    { user: 'Ahmad', action: 'placed a new order', item: '#ORD-12345', time: '5m ago' },
    { user: 'Admin', action: 'updated product', item: 'Oud Wood', time: '1h ago' },
    { user: 'Fatima', action: 'placed a new order', item: '#ORD-12344', time: '3h ago' },
    { user: 'Admin', action: 'added a new product', item: 'Sandalwood Oil', time: 'yesterday' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <main className="p-6 sm:p-10 space-y-10">
        {/* Welcome Header */}
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
            <h2 className="text-gray-600 ml-0.5">Welcome back, Admin!</h2>
          </div>
          <div className="flex flex-wrap items-start justify-end -mb-3">
            <Link to="/admin/products/new" className="inline-flex px-5 py-3 text-white bg-amber-600 hover:bg-amber-700 focus:bg-amber-700 rounded-md ml-6 mb-3">
              <Package className="w-4 h-4 mr-2" />
              Add New Product
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((item) => {
            const content = (
              <div className="h-full">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{item.name}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1 flex items-center">
                      {isLoading && item.name === 'Total Products' ? (
                        <Loader2 className="h-7 w-7 animate-spin text-gray-400" />
                      ) : (
                        item.stat
                      )}
                    </p>
                    <div className={`flex items-center mt-2 text-sm ${item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change && (
                        <>
                          {item.changeType === 'increase' ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          <span className="ml-1">{item.change} from last month</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={`p-4 rounded-full ${item.name === 'Total Products' ? 'bg-amber-100' : 'bg-gray-100'}`}>
                    <item.icon className={`h-7 w-7 ${item.name === 'Total Products' ? 'text-amber-600' : 'text-gray-600'}`} />
                  </div>
                </div>
              </div>
            );

            return item.link ? (
              <Link key={item.name} to={item.link} className="block h-full">
                {content}
              </Link>
            ) : (
              <div key={item.name} className="h-full">
                {content}
              </div>
            );
          })}
        </section>

        {/* Charts and Recent Activities */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Sales Trends</h3>
              <button className="text-gray-500 hover:text-gray-800">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart will be displayed here</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-1.5 h-1.5 mt-2.5 bg-amber-500 rounded-full"></div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">{activity.user}</span> {activity.action}{' '}
                      <span className="font-semibold text-amber-700">{activity.item}</span>.
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
