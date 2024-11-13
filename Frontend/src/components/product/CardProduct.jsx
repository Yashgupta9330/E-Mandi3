import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { formatDistanceToNow, parseISO } from 'date-fns';

export default function CardProduct({product}){
    const navigate = useNavigate();
    const onDetail = (productId) => {
        navigate("/details", { state: { id: productId } });
    };

    const formatRelativeDate = (dateString) => {
        const date = parseISO(dateString); // Convert the ISO string to a Date object
        return `${formatDistanceToNow(date)} ago`; // Format the distance to the current date
    };

     return(
        <Card key={product._id} onClick={() => onDetail(product._id)}>
        <CardHeader>
            <CardTitle className="flex justify-between items-center w-[280px]">
                <span>{product.productName}</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">{product.CurQuantity} kg</Badge>
            </CardTitle>
            <span className="text-sm text-gray-500">{formatRelativeDate(product.date)}</span>
        </CardHeader>
        <CardContent>
            <img src={product.image} alt={product.productName} className="w-full rounded-lg h-32 object-cover mb-4" />
            <div className='flex w-full justify-between'>
                <p className="text-2xl font-bold">Rs {product.price}/kg</p>
                <Badge variant="secondary" className="bg-green-100 text-green-800">{product.state}</Badge>
            </div>
        </CardContent>
        <CardFooter>
            <button  onClick={() => onDetail(product._id)} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors">
                Add to Cart
            </button>
        </CardFooter>
    </Card>
     )
}