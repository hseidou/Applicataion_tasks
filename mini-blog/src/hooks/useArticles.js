import { useState, useEffect } from "react";

const API_BASE = "http://127.0.0.1:8000/articles/";

export function useArticles() {
    const [articles, setArticles] = useState([]);

    const getHeaders = () => {
        const token = localStorage.getItem("access_token");
        return {
            "Authorization": token ? `Bearer ${token}` : "",
        };
    };

    const fetchArticles = async () => {
        try {
            const res = await fetch(`${API_BASE}?t=${Date.now()}`);
            const data = await res.json();
            setArticles(data);
        } catch (error) {
            console.error("Failed to fetch articles:", error);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const createArticle = async (title, content) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);

        const res = await fetch(`${API_BASE}create/`, {
            method: "POST",
            headers: getHeaders(),
            body: formData,
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || "Erreur lors de la création de l'article");
        }

        await res.json();
        await fetchArticles();
    };

    const deleteArticle = async (id) => {
        if (!confirm("Supprimer cet article ?")) return;
        try {
            const res = await fetch(`${API_BASE}${id}/delete/`, {
                method: "DELETE",
                headers: getHeaders()
            });
            if (res.status === 401) alert("Veuillez vous connecter pour supprimer.");
            await fetchArticles();
        } catch (error) {
            console.error("Delete Article Error:", error);
        }
    };

    const updateArticle = async (id, title, content) => {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);

            await fetch(`${API_BASE}${id}/update/`, {
                method: "POST",
                headers: getHeaders(),
                body: formData,
            });
            await fetchArticles();
        } catch (error) {
            console.error("Update Article Error:", error);
        }
    };

    return {
        articles,
        fetchArticles,
        createArticle,
        deleteArticle,
        updateArticle
    };
}
