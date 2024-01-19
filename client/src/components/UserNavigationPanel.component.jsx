import { Link } from "react-router-dom"
import { AnimationWrapper } from "../common/Animations"
import { IconExit, IconNotify, IconSetting, IconUser, IconWrite } from "./Icon.component"
import { useSelector } from "react-redux"


const UserNavigationPanel = () => {
    const { user } = useSelector((state) => state.user)

    return(
        <AnimationWrapper transition={{ duration: 0.2 }} className={"absolute right-2 top-[5rem] z-50"}>
            <div className="bg-gray-50 flex flex-col gap-1 absolute right-2 border border-gray-200 w-60 rounded-lg overflow-hidden duration-200 pt-2">
                <Link to={`/profile/@${user.username}`} className="flex link gap-2 text-gray-700 hover:text-blue-700">
                    <IconUser />
                    <span>Profile</span>
                </Link>

                <Link className="flex link gap-2 text-gray-700 hover:text-blue-700 md:hidden">
                    <IconNotify />
                    <span>Notifications</span>
                </Link>

                <Link to={"/editor"} className="flex link gap-2 text-gray-700 hover:text-blue-700 md:hidden">
                    <IconWrite />
                    <span>Write</span>
                </Link>
                <Link to={"/settings"} className="flex link gap-2 text-gray-700 hover:text-blue-700">
                    <IconSetting />
                    <span>Settings</span>
                </Link>

                <button className="flex justify-around items-center gap-3 border-t py-2 hover:bg-red-50 hover:text-red-500">
                    <IconExit />
                    <div className="flex flex-col items-start">
                        <span className="font-bold">Sign Out</span>
                        <span className="text-xs text-gray-500">@{ user.username }</span>
                    </div>
                </button>
            </div>
        </AnimationWrapper>
    )
}

export default UserNavigationPanel