import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../../Server/base_url';

// Mock data (replace with actual data from your API)
const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
];

const topProducts = [
  { name: 'Tomatoes', value: 400 },
  { name: 'Potatoes', value: 300 },
  { name: 'Onions', value: 300 },
  { name: 'Carrots', value: 200 },
];

const COLORS = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B'];

export default function FarmerSalesDashboard() {
  const [timeRange, setTimeRange] = useState('This Year');
  let token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/order_history/show`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const json = await response.json();
        setData(json.history);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const averageSales = totalSales / salesData.length;

  return (
    <div className="container mx-auto p-4 min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Farmer Sales Dashboard</h1>

      {/* Dropdown for Time Range Selection */}
      <div className="mb-6">
        <Select onValueChange={(value) => setTimeRange(value)}>
          <SelectTrigger className="w-[180px] bg-yellow-100 border-green-500">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent className="bg-black">
            <SelectItem value="This Month">This Month</SelectItem>
            <SelectItem value="This Quarter">This Quarter</SelectItem>
            <SelectItem value="This Year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-green-100 border-green-500 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-green-800">Total Sales</h3>
          <div className="text-2xl font-bold text-green-700">₹{totalSales.toLocaleString()}</div>
          <p className="text-xs text-green-600">For {timeRange}</p>
        </div>
        <div className="bg-green-100 border-green-500 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-green-800">Average Monthly Sales</h3>
          <div className="text-2xl font-bold text-green-700">₹{averageSales.toLocaleString()}</div>
          <p className="text-xs text-green-600">For {timeRange}</p>
        </div>
        <div className="bg-green-100 border-green-500 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-green-800">Total Orders</h3>
          <div className="text-2xl font-bold text-green-700">150</div>
          <p className="text-xs text-green-600">For {timeRange}</p>
        </div>
        <div className="bg-green-100 border-green-500 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-green-800">Top Product</h3>
          <div className="text-2xl font-bold text-green-700">{topProducts[0].name}</div>
          <p className="text-xs text-green-600">₹{topProducts[0].value.toLocaleString()} in sales</p>
        </div>
      </div>

      {/* Tabs for Sales Overview and Top Products */}
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="bg-yellow-100">
          <TabsTrigger value="sales" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Sales Overview</TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Top Products</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="space-y-4">
          <Card className="bg-white border-green-500">
            <CardHeader>
              <CardTitle className="text-green-800">Monthly Sales</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#4CAF50" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="products" className="space-y-4">
          <Card className="bg-white border-green-500">
            <CardHeader>
              <CardTitle className="text-green-800">Top Products</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topProducts}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {topProducts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
