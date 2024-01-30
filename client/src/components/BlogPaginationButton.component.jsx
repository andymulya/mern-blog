import PropTypes from "prop-types"


{/* Pagination akan display ketika data lebih dari 5 halaman */}

const BlogPaginationButton = ({ dataBlogs, handlePagination }) => {

    const totalPage = Math.ceil(dataBlogs?.totalBlogs / 5)
    
    return (
        (dataBlogs) && (dataBlogs.totalBlogs >= 6 ) &&
        <div className="flex gap-4 items-center justify-between w-[60px] mx-auto">
            <button className={`py-1 px-2 bg-blue-700 rounded-full text-white ${(dataBlogs.page <= 1) && "hidden pointer-events-none"}`} onClick={ handlePagination.prev }>{"<<"}</button>
            <span className="font-medium text-lg">{ dataBlogs.page }</span>
            <button className={`py-1 px-2 bg-blue-700 rounded-full text-white ${(dataBlogs.page >= totalPage) && "hidden pointer-events-none"}`} onClick={ handlePagination.next }>{">>"}</button>
        </div>
    )
}

export default BlogPaginationButton

BlogPaginationButton.propTypes = {
    dataBlogs: PropTypes.object,
    handlePagination: PropTypes.object
}