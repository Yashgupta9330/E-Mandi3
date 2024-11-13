import { useState, useEffect } from 'react'
import Footer from '../Home/Footer'
import axios from 'axios'
import { Input } from '../ui/input'
import { Slider } from '../ui/slider'  // Ensure that this import is correct
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'
import CardProduct from '../product/CardProduct'

export default function Productslist() {
    const [search, setSearch] = useState('')
    const [priceRange, setPriceRange] = useState([0, 200])  // Initial value as an array with two values
    const [role, setRole] = useState('all')
    const [location, setLocation] = useState('all')
    const [products, setProducts] = useState([])
  
    const navigate = useNavigate();    
    const States = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
        "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
        "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep",
        "Puducherry",
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/list/show")
                setProducts(response.data)
            } catch (error) {
                console.error('Error fetching products', error)
            }
        }

        fetchProducts()
    }, [])

    // Filtering the products based on the criteria
    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(search.toLowerCase()) &&
        product.price >= priceRange[0] && product.price <= priceRange[1] &&
        (role === 'all' || (role === 'cheap' && product.price < 2) || (role === 'premium' && product.price >= 2)) &&
        (location === 'all' || product.state.toLowerCase() === location.toLowerCase())
    )

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className='flex'>
                <aside className="w-[400px] bg-white p-6 shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Filters</h2>
                    <div className="space-y-6">
                        {/* Search Filter */}
                        <div>
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                            <Input
                                id="search"
                                placeholder="Search products"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Price Range Slider */}
                        <div>
                            <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                            <Slider
                                value={priceRange}  // Use priceRange directly here
                                onValueChange={setPriceRange}  // Update the priceRange state directly
                                max={200}
                                step={1}
                                className="bg-black text-white"
                            />
                            <div className="text-sm text-gray-500 mt-1">
                                Rs {priceRange[0]} - Rs {priceRange[1]}
                            </div>
                        </div>

                        {/* Role Filter */}
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <Select value={role} onValueChange={setRole}>
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="cheap">Budget-friendly</SelectItem>
                                    <SelectItem value="premium">Premium</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Location Filter */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <Select value={location} onValueChange={setLocation}>
                                <SelectTrigger id="location">
                                    <SelectValue placeholder="Select a location" />
                                </SelectTrigger>
                                <SelectContent className="bg-black">
                                    <SelectItem value="all">All</SelectItem>
                                    {States.map((state) => (
                                        <SelectItem key={state} value={state}>
                                            {state}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </aside>

                {/* Main content area */}
                <main className="flex-1 p-6">
                    <h1 className="text-3xl font-bold mb-6">Available Products</h1>

                    {/* Check if there are no filtered products */}
                    {filteredProducts.length === 0 ? (
                        <p className="text-center text-lg font-semibold text-gray-500">No available products</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <CardProduct product={product} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    )
}
