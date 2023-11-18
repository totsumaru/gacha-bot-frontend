"use client";

import {
  Box,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Link as ChakraLink,
  Popover,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { ChevronDownIcon, CloseIcon, HamburgerIcon, } from '@chakra-ui/icons'
import LoginButton from "@/components/button/LoginButton";
import LogoutButton from "@/components/button/LogoutButton";

type Props = {
  isLogin?: boolean
  displayLoginButton?: boolean
  serverId?: string
  isTopPage?: boolean
}

export default function Header({
  isLogin, displayLoginButton, serverId, isTopPage
}: Props) {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3}/> : <HamburgerIcon w={5} h={5}/>}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            fontWeight={"bold"}
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            Gacha-bot
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav serverId={serverId || ""} isTopPage={isTopPage || false}/>
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {/* ログインボタン */}
          {displayLoginButton === true && (isLogin ?
              <LogoutButton/> : <LoginButton serverId={serverId || ""}/>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav serverId={serverId || ""}/>
      </Collapse>
    </Box>
  )
}

const DesktopNav = ({
  serverId, isTopPage
}: {
  serverId: string,
  isTopPage: boolean
}) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS(serverId).map((navItem) => (
          navItem.isTopPageDisplay && isTopPage === true && (
            <Box key={navItem.label}>
              <Popover trigger={'hover'} placement={'bottom-start'}>
                <PopoverTrigger>
                  <ChakraLink
                    href={navItem.href ?? '#'}
                    p={2}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                      textDecoration: 'none',
                      color: linkHoverColor,
                    }}
                  >
                    {navItem.label}
                  </ChakraLink>
                </PopoverTrigger>
              </Popover>
            </Box>
          )
        )
      )}
    </Stack>
  )
}

const MobileNav = ({ serverId }: { serverId: string }) => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS(serverId).map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? '#'}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}>
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
  isTopPageDisplay: boolean
}

const NAV_ITEMS = (serverId: string): Array<NavItem> => {
  return [
    {
      label: 'Topページ',
      href: '/',
      isTopPageDisplay: true,
    },
    {
      label: 'ガチャ',
      href: `/server/${serverId}`,
      isTopPageDisplay: false,
    },
    {
      label: 'ダッシュボード',
      href: `/server/${serverId}/dashboard`,
      isTopPageDisplay: false,
    },
  ]
}