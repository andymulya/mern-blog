import { Link } from 'react-router-dom'
import PropTypes from "prop-types"
import { IconFacebook, IconGithub, IconInstagram, IconTwitter, IconWebsite, IconYoutube } from './Icon.component'
import { getFullDay } from '../utils'

const iconsSocialLink = {
    youtube: <IconYoutube />,
    instagram: <IconInstagram />,
    facebook: <IconFacebook />,
    twitter: <IconTwitter />,
    github: <IconGithub />,
    website: <IconWebsite />
}

const AboutUser = ({ bio, socialLinks, createdAt, style }) => {
    return (
        <section className={`flex flex-col gap-4 md:w-[90%] md:mt-3 ${ style }`}>
            <p className="text-lg leading-7 text-gray-700">{ (bio.length) ? bio : "Nothing to read here" }</p>
            <div className="flex">
                {
                    Object.keys(socialLinks).map((key) => {
                        let link = socialLinks[key]

                        if(link){
                        
                            return(
                                <Link to={ link } key={ key } target='_blank'>
                                    { iconsSocialLink[key] }
                                </Link>
                            )
                        }

                    })
                }
            </div>
            <span className="text-gray-600 text-sm">Joined on { getFullDay(createdAt) }</span>
        </section>
    )
}

export default AboutUser

AboutUser.propTypes = {
    bio: PropTypes.string,
    socialLinks: PropTypes.object,
    createdAt: PropTypes.string,
    style: PropTypes.string
}