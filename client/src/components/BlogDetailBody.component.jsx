import PropTypes from "prop-types"


const ImgWCaption = ({ url, caption }) => {
    return(
        <section className="my-5 w-full">
            <img src={ url } alt={ caption } className="m-auto" />
            {
                (caption) && 
                <p dangerouslySetInnerHTML={{ __html: caption }} className="w-full text-center my-3 md:mb-12 text-base text-gray-400 inline-block" />
            }
        </section>
    )
}

ImgWCaption.propTypes = {
    url: PropTypes.string,
    caption: PropTypes.string
}

const Qoute = ({ qoute, caption }) => {
    return (
        <section className="p-3 pl-5 border-l-4 border-blue-700 bg-blue-700/10 rounded-md">
            <h1 dangerouslySetInnerHTML={{ __html: qoute }} className="text-xl leading-10 md:text-2xl" />
            {
                (caption) && 
                <p dangerouslySetInnerHTML={{ __html:caption }} className="w-full text-blue-700" />
            }
        </section>
    )
}

Qoute.propTypes = {
    qoute: PropTypes.string,
    caption: PropTypes.string
}


const List = ({ style, items }) => {
    return (
        <ol className={`pl-5 ${ style === "ordered" ? "list-decimal" : "list-disc" }`}>
            {
                items.map((list, i) => <li key={ i } className="my-4" dangerouslySetInnerHTML={{ __html: list }} />)
            }
        </ol>
    )
}

List.propTypes = {
    style: PropTypes.string,
    items: PropTypes.array
}



const BlogDetailBody = ({ block: { type, data } }) => {
    
    switch (type) {
        case "header":
            if(data.level == 2) return <h2 dangerouslySetInnerHTML={{ __html: data.text }} />
            if(data.level == 3) return <h3 dangerouslySetInnerHTML={{ __html: data.text }} />
            return <h4 dangerouslySetInnerHTML={{ __html: data.text }} />
        
        case "paragraph":
            return <p dangerouslySetInnerHTML={{ __html:data.text }} className="leading-7 my-3 text-lg" />
        
        case "image":
            return <ImgWCaption url={ data.file.url } caption={ data.caption } />

        case "qoute":
            return <Qoute qoute={ data.text } caption={ data.caption } />

        case "list":
            return <List style={ data.style } items={ data.items } />

        default:
            break
    }
}

export default BlogDetailBody

BlogDetailBody.propTypes = {
    block: PropTypes.object
}