import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../apis/list";

export const useListing = () => {

    const [productData, setProductData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [search, setSearch] = useState("");

    // User Login
    const getEventsData = useCallback(async () => {
        try {
            setLoading(true);

            console.log("called");

            const response = await getProducts();
            if (response) {
                setProductData(response);
            } else {
                setProductData([]);
            }
        } catch (e) {
            console.log("error", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getEventsData();
    }, [])


    const filteredProducts = productData.filter(prod =>
        prod.title.toLowerCase().includes(search.toLowerCase())
    );

    return {
        loading,
        selectedCategory,
        setSelectedCategory,
        search,
        setSearch,
        filteredProducts
    };
};