import PropTypes from "prop-types"


{/* Pagination akan display ketika data lebih dari 5 halaman */}

const BlogPaginationButton = ({ dataBlogs, handlePagination }) => {

    const totalPage = Math.ceil(dataBlogs?.totalBlogs / 5)
    
    return (
        (dataBlogs) && (dataBlogs.totalBlogs >= 6 ) &&
        <div className="flex gap-2 w-full items-center justify-center">
            <button className={`py-1 px-2 bg-blue-700 rounded-full text-white ${(dataBlogs.page <= 1) && "hidden pointer-events-none"}`} onClick={ handlePagination.prev }>{"<<"}</button>
            <span>{ dataBlogs.page }</span>
            <button className={`py-1 px-2 bg-blue-700 rounded-full text-white ${(dataBlogs.page >= totalPage) && "hidden pointer-events-none"}`} onClick={ handlePagination.next }>{">>"}</button>
        </div>
    )
}

export default BlogPaginationButton

BlogPaginationButton.propTypes = {
    dataBlogs: PropTypes.object,
    handlePagination: PropTypes.object
}