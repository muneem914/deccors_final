import React from 'react'
import MetaData from '../layout/MetaData'
import PageFrame from '../layout/PageFrame'
import MainFrame from '../layout/MainFrame'
import { Link } from 'react-router-dom'
import BlogItem from '../blog/BlogItem'
import { useGetBlogsQuery } from '../../redux/api/blogApi'

const Blogs = () => {
    const { data } = useGetBlogsQuery();
  return (
    <>
    <MetaData title="All Blogs" />
      <PageFrame>
      <div className="imageContainer contact">
          <div className="row">
            <h1>Blogs</h1>
            <p>
              <Link to="/">Home</Link> <span>|</span> Blogs
            </p>
          </div>
        </div>
        <MainFrame>
            
        <div className="blogContainer" id='blogContainerPage'>
            {data?.blogs?.map((item, index) => (
                <BlogItem key={index} item={item}/>
            ))}
            
          </div>
        </MainFrame>
        </PageFrame>
    </>
  )
}

export default Blogs