import "@/styles/globals.css";
import Layout from "@/Layout/Layout";
import LayoutAdmin from "@/Layout/LayoutAdmin";
import localStorage from "localStorage";
import { ROOT_URL } from "@/env";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps, router }) {
  const data = {
    lang: 'en',
    rating: []
  }
  if(!localStorage.getItem('token')){
    localStorage.setItem('token', JSON.stringify(data)) 
  }

  const [categories, setCategories] = useState()
  const [listFlash, setListFlash] = useState()
  const storage = JSON.parse(localStorage.getItem('token'))

  const getCategories = async () => {
    const paramCategory = {query: 'getFullCategories', param: false} // query: ilay anaran'ilay méthode ao @ MyDatabase
    await fetch(`${ROOT_URL}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramCategory),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => setCategories(data.result))
  }
  
  const getListFlash = async (lang) => {
    const paramFlash = {query: 'getFlashByLang', param: [lang]} // query: ilay anaran'ilay méthode ao @ MyDatabase
    await fetch(`${ROOT_URL}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramFlash),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => setListFlash(data.result))
  }

  useEffect(() => {
    getCategories()
    getListFlash(storage.lang)
  },[])

  const getLayout = () => {


    if (router.pathname.startsWith("/admin")) {
      return (
        <LayoutAdmin>
          <Component {...pageProps} />
        </LayoutAdmin>
      );
    }

    return (
      <Layout listCategories={categories} listFlash={listFlash}>
        <Component {...pageProps} />
      </Layout>
    );
  };
  return getLayout();
}


