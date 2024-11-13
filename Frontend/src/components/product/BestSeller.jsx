import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { useEffect, useState } from "react"
import CardProduct from "./CardProduct"
import axios from "axios"
import user2 from "../../images/user2.jpg"
import user3 from "../../images/user3.jpg"
import user4 from "../../images/user4.jpg"
import user5 from "../../images/user5.jpg"
import user6 from "../../images/user6.jpg"
import user7 from "../../images/user7.jpg"
import user8 from "../../images/user8.jpg"


const topFarmers = [
    {
        id: 1,
        name: "Rajesh Kumar",
        location: "Punjab",
        rating: 4.8,
        products: 15,
        image:  user6
    },
    {
        id: 2,
        name: "Sunita Devi",
        location: "Haryana",
        rating: 4.9,
        products: 12,
        image:  user7
    },
    {
        id: 3,
        name: "Amit Patel",
        location: "Gujarat",
        rating: 4.7,
        products: 18,
        image: user8
    },
    {
        id: 4,
        name: "Priya Singh",
        location: "Madhya Pradesh",
        rating: 4.6,
        products: 10,
        image: user2
    },
    {
        id: 5,
        name: "Mohan Gupta",
        location: "Uttar Pradesh",
        rating: 4.5,
        products: 14,
        image: user3
    },
    {
        id: 5,
        name: "Mohan Gupta",
        location: "Uttar Pradesh",
        rating: 4.5,
        products: 14,
        image: user4
    },
    {
        id: 5,
        name: "Mohan Gupta",
        location: "Uttar Pradesh",
        rating: 4.5,
        products: 14,
        image: user5
    }
]

export default function BestSellers() {
    const [products,setProducts]=useState([]);
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

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Best Sellers & Top Farmers</h1>
                <p className="text-xl text-muted-foreground">
                    Discover our top-selling products and most trusted farmers
                </p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-semibold mb-6">Best Selling Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {products.slice(0,4).map((product) => (
                            <CardProduct product={product} />
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-6">Top Farmers</h2>
                    <div className="space-y-4">
                        {topFarmers.map((farmer) => (
                            <Card key={farmer.id}>
                                <CardContent className="flex items-center p-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={farmer.image} alt={farmer.name} />
                                        <AvatarFallback>{farmer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 flex-grow">
                                        <h3 className="font-semibold">{farmer.name}</h3>
                                        <p className="text-sm text-muted-foreground">{farmer.location}</p>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant="secondary" className="mb-1 bg-green">
                                            {farmer.rating} ★
                                        </Badge>
                                        <p className="text-sm text-muted-foreground">{farmer.products} products</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}