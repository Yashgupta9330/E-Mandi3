import { Link } from "react-router-dom"


export const Navbar=()=>{
    return(
    <header className="bg-green-600 text-white p-4">
    <div className="flex justify-between items-center px-4">
      <h1 className="text-2xl font-bold">E-MANDI</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/products" className="hover:underline">Products</Link></li>
          <li><Link href="/product-listing" className="hover:underline">Add Products</Link></li>
          <li><Link href="/login" className="hover:underline">Login</Link></li>
          <li><Link href="/register" className="hover:underline">Register</Link></li>
        </ul>
      </nav>
    </div>
  </header>
    )
}