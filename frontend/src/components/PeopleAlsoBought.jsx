import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard"
import axios from "axios";
import {toast} from 'react-hot-toast'
import LoadingSpinner from "./LoadingSpinner"
import axiosInstance from "../lib/axios";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendations = async () => {
     try {
      const res = await axiosInstance.get("/products/recommendations");
      setRecommendations(res.data)
     } catch (error) {
      toast.error(error.response.data.message || "An error occurred while fetching recommendations")
     } finally {
      setIsLoading(false)
     }
    }

    fetchRecommendations()
  },[])

  if (isLoading) return <LoadingSpinner />


  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-orange-400">
        People Also Brought
      </h3>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {recommendations.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
      </div>
    </div>
  )
}

export default PeopleAlsoBought