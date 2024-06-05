/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { axiosCus } from "../axios/axios";
import { URLBlog } from "../URL/url";

function blogs() {
    const [listBlogs, setListBlogs] = useState();

    useEffect(() => {
        const fetchData = async () => {
                try {
                    const res = await axiosCus.get(URLBlog)
                    console.log(res)
                    setListBlogs(res.listBlogs)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }

            }
        fetchData();
    }, []);

    return (
    <>
        <section className="banner-shop banner-about banner-blogs mb-0">
            <div className="container-xxl">
                <div className="row">
                    <div className="bannerShop-detail text-center">
                        <h2 className="text-white fs-1">#Blog</h2>
                        <span className="text-white fs-5">Get more information</span>
                    </div>
                </div>
            </div>
        </section>
        <section className="container-xxl bg-white text-black blog-section p-5">
            <div className="row">
            {listBlogs && listBlogs.map(blog => {
                return (
                    <div key={blog.id}>
                        <img src={blog.image} alt="" className="img-fluid" />
                        <h3 className="text-center my-4">{blog.tenBlog}</h3>
                        <p>{blog.detail}</p>
                    </div>
                )
                })
            }
            </div>
        </section>
    </>
    );
}

export default blogs;