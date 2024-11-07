import React from 'react'
import { Icon, Stack } from '@chakra-ui/react'

import { ParentPlatform } from '@/types/interfaces'
import { IconType } from 'react-icons';
import { FaAndroid, FaApple, FaLinux, FaPlaystation, FaWindows, FaXbox } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
import { SiNintendo } from "react-icons/si";

const Platforms = ({ parent_platforms }: { parent_platforms: ParentPlatform[] }) => {
    const icons: { [key: string]: IconType } = {
        pc: FaWindows,
        playstation: FaPlaystation,
        xbox: FaXbox,
        nintendo: SiNintendo,
        mac: FaApple,
        linux: FaLinux,
        android: FaAndroid,
        ios: MdPhoneIphone,
        web: BsGlobe,
    }

    return (
        <Stack direction={'row'}>
            {parent_platforms?.map((item: ParentPlatform) => (
                <Icon key={item.platform.id} as={icons[item.platform.slug]} />
            ))}
        </Stack>
    )
}

export default Platforms
