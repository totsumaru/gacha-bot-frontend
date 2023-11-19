'use client'

import {
  Box,
  Button,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'

const options = [
  { id: 1, desc: '全ての機能を利用できます' },
  { id: 2, desc: 'ガチャに応じたポイントを取得/表示ができます' },
  { id: 3, desc: '画像,文字は自由に変更可能' },
  { id: 4, desc: '(今後追加予定)ポイントに応じてロールを付与' },
]

interface PackageTierProps {
  title: string
  options: Array<{ id: number; desc: string }>
  typePlan: string
  checked?: boolean
}

const PackageTier = ({ title, options, typePlan, checked = false }: PackageTierProps) => {
  const colorTextLight = checked ? 'white' : 'white'
  const bgColorLight = checked ? 'purple.400' : 'purple.400'

  const colorTextDark = checked ? 'white' : 'white'
  const bgColorDark = checked ? 'purple.400' : 'purple.400'

  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: 'flex-start',
        md: 'space-around',
      }}
      direction={{
        base: 'column',
        md: 'row',
      }}
      alignItems={{ md: 'center' }}>
      <Heading size={'md'}>{title}</Heading>
      <List spacing={3} textAlign="start">
        {options.map((desc, id) => (
          <ListItem key={desc.id}>
            <ListIcon as={FaCheckCircle} color="green.500"/>
            {desc.desc}
          </ListItem>
        ))}
      </List>
      <Heading size={'xl'}>{typePlan}</Heading>
      <Stack>
        <Button
          as={'a'}
          href={"https://discord.com/api/oauth2/authorize?client_id=1172688244429820038&permissions=414733167680&scope=bot"}
          size="md"
          target={"_blank"}
          color={useColorModeValue(colorTextLight, colorTextDark)}
          bgColor={useColorModeValue(bgColorLight, bgColorDark)}>
          botを導入する
        </Button>
      </Stack>
    </Stack>
  )
}

const ThreeTierPricingHorizontal = () => {
  return (
    <Box py={6} px={5} width="full">
      <Stack spacing={4} width={'100%'} direction={'column'}>
        <Stack
          p={5}
          alignItems={'center'}
          justifyContent={{
            base: 'flex-start',
            md: 'space-around',
          }}
          direction={{
            base: 'column',
            md: 'row',
          }}>
          <Stack
            width={{
              base: '100%',
              md: '40%',
            }}
            textAlign={'center'}>
            <Heading size={'lg'}>
              お試し2週間
            </Heading>
          </Stack>
          <Stack
            width={{
              base: '100%',
              md: '60%',
            }}>
            <Text textAlign={'center'}>
              最初の14日間は無料でお試しいただけます。その後は月額500円/月でご利用いただけます。解約はいつでも可能です。
            </Text>
          </Stack>
        </Stack>
        <Divider/>
        <PackageTier
          title={'ベーシック'}
          checked={true}
          typePlan="500円/月"
          options={options}
        />
        <Divider/>
        <PackageTier title={'トライアル(2週間)'} typePlan="Free" options={options}/>
        <Divider/>
      </Stack>
    </Box>
  )
}

export default ThreeTierPricingHorizontal