'use client';

import { useState } from 'react';
import Header from './Header';
import { useOrder } from './OrderContext';

interface ProfileProps {
  onBackClick?: () => void;
  onTabClick?: (tab: string) => void;
}

export default function Profile({ onBackClick, onTabClick }: ProfileProps) {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const { orders } = useOrder();
  
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    address: '123 Main Street, City, State 12345',
    favoriteTable: '5',
    dietaryPreferences: ['Vegetarian'],
    notifications: {
      orderUpdates: true,
      promotions: true,
      newItems: false
    }
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setUserInfo(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setUserInfo(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile updated:', userInfo);
  };

  const recentOrders = orders.slice(-3).reverse();

  const menuSections = [
    { id: 'profile', name: 'Profile Info', icon: '👤' },
    { id: 'orders', name: 'Order History', icon: '📋' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' },
    { id: 'help', name: 'Help & Support', icon: '❓' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header 
        title="My Profile"
        showBack={true}
        onBackClick={onBackClick}
      />

      {/* Profile Header */}
      <div className="bg-white border-r rounded-[10px] shadow-md px-4 py-8 mt-[-20px] mx-4">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-3xl ">👤</span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold ">{userInfo.name}</h2>
            <p className="">{userInfo.email}</p>
            <div className="flex items-center mt-2">
              <span className="bg-white/20  text-xs  py-1 rounded-full">
                Regular Customer
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          {menuSections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center justify-between p-4 text-left hover:bg-white transition-colors ${
                index !== menuSections.length - 1 ? 'border-b border-gray-100' : ''
              } ${activeSection === section.id ? 'bg-red-50 border-l-4 border-l-red-500' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{section.icon}</span>
                <span className="font-medium text-gray-800">{section.name}</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-4 pb-20">
        {/* Profile Info Section */}
        {activeSection === 'profile' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>

            <div className="bg-white rounded-xl p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                ) : (
                  <p className="p-3 bg-white border border-gray-200 rounded-lg">{userInfo.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                ) : (
                  <p className="p-3 bg-white border border-gray-200 rounded-lg">{userInfo.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                ) : (
                  <p className="p-3 bg-white border border-gray-200 rounded-lg">{userInfo.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                {isEditing ? (
                  <textarea
                    value={userInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                ) : (
                  <p className="p-3 bg-white border border-gray-200 rounded-lg">{userInfo.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Favorite Table</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userInfo.favoriteTable}
                    onChange={(e) => handleInputChange('favoriteTable', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Table number"
                  />
                ) : (
                  <p className="p-3 bg-white border border-gray-200 rounded-lg">Table {userInfo.favoriteTable}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Order History Section */}
        {activeSection === 'orders' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
            
            {recentOrders.length > 0 ? (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800">Order #{order.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'ready' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {new Date(order.timestamp).toLocaleDateString()} • ₹{order.total}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items.length} items • Table {order.customerInfo.tableNumber}
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => onTabClick?.('orders')}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  View All Orders
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 text-center">
                <span className="text-4xl mb-4 block">📋</span>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No Orders Yet</h3>
                <p className="text-gray-600 mb-4">Start ordering to see your history here</p>
                <button
                  onClick={() => onTabClick?.('home')}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            )}
          </div>
        )}

        {/* Preferences Section */}
        {activeSection === 'preferences' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Preferences & Settings</h3>
            
            <div className="bg-white rounded-xl p-4 space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Dietary Preferences</h4>
                <div className="space-y-2">
                  {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'].map((pref) => (
                    <label key={pref} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={userInfo.dietaryPreferences.includes(pref)}
                        onChange={(e) => {
                          const newPrefs = e.target.checked
                            ? [...userInfo.dietaryPreferences, pref]
                            : userInfo.dietaryPreferences.filter(p => p !== pref);
                          setUserInfo(prev => ({ ...prev, dietaryPreferences: newPrefs }));
                        }}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="ml-2 text-gray-700">{pref}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-800 mb-3">Notifications</h4>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">Order Updates</span>
                    <input
                      type="checkbox"
                      checked={userInfo.notifications.orderUpdates}
                      onChange={(e) => handleInputChange('notifications.orderUpdates', e.target.checked)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">Promotions & Offers</span>
                    <input
                      type="checkbox"
                      checked={userInfo.notifications.promotions}
                      onChange={(e) => handleInputChange('notifications.promotions', e.target.checked)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">New Menu Items</span>
                    <input
                      type="checkbox"
                      checked={userInfo.notifications.newItems}
                      onChange={(e) => handleInputChange('notifications.newItems', e.target.checked)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help & Support Section */}
        {activeSection === 'help' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Help & Support</h3>
            
            <div className="space-y-3">
              {[
                { title: 'FAQ', icon: '❓', desc: 'Frequently asked questions' },
                { title: 'Contact Support', icon: '📞', desc: 'Get help from our team' },
                { title: 'Report Issue', icon: '🐛', desc: 'Report a problem' },
                { title: 'Terms & Conditions', icon: '📄', desc: 'Read our terms' },
                { title: 'Privacy Policy', icon: '🔒', desc: 'Your privacy matters' },
                { title: 'Rate App', icon: '⭐', desc: 'Share your feedback' }
              ].map((item) => (
                <button
                  key={item.title}
                  className="w-full bg-white rounded-xl p-4 flex items-center space-x-3 hover:bg-white transition-colors border border-gray-100"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>

            <div className="bg-red-50 rounded-xl p-4 mt-6">
              <h4 className="font-medium text-red-800 mb-2">Need Immediate Help?</h4>
              <p className="text-red-700 text-sm mb-3">Call our support team for urgent assistance</p>
              <a
                href="tel:+919876543210"
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors inline-block"
              >
                📞 Call Support
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}