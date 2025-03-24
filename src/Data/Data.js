import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilUsdSquare,
    UilMoneyWithdrawal,
    
    

} from '@iconscout/react-unicons';
import img1 from '../imgs/img1.png'
import img2 from '../imgs/img2.png'
import img3 from '../imgs/img3.png'


export const SidebarData = [
  {
      icon: UilEstate,
      heading: 'Login',
      link: '/login',  // Add the route here
  },
  {
      icon: UilClipboardAlt,
      heading: 'Orders',
      link: '/orders',
  },
  {
      icon: UilUsersAlt,
      heading: 'Category',
      link: '/category',
  },
  {
      icon: UilPackage,
      heading: 'Products',
      link: '/products',
  },
  {
    icon: UilPackage,
    heading: 'allproducts',
    link: '/allproducts',
},
  {
      icon: UilPackage,
      heading: 'Post-Create',
      link: '/post',
  },
  {
    icon: UilPackage,
    heading: 'All-Admin-Post',
    link: '/allPost',
},
  {
    icon: UilPackage,
    heading: 'Add Counsellor',
    link: '/add-counsellor',
  },
  {
    icon: UilPackage,
    heading: 'Get Counsellors',
    link: '/get-counsellors',
  },
  {
    icon: UilPackage,
    heading: 'Mental Health',
    link: '/mentalhealth',
  },
  {
    icon: UilPackage,
    heading: 'get-Mental-Health',
    link: '/get-mentalhealth',
  },
  {
    icon: UilPackage,
    heading: 'Change-password',
    link: '/change-password',
  },
];

export const CardsData = [
    {
        title:'Sales',
        color: {
          backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
          boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 70,
        value: '25,970',
        png: UilUsdSquare ,
        series:[{
            name:"Sales",
            data:[31,40,28,51,42,109,100]
        }
        ]},
        {
            title: "Revenue",
            color: {
              backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
              boxShadow: "0px 10px 20px 0px #FDC0C7",
            },
            barValue: 80,
            value: "14,270",
            png: UilMoneyWithdrawal,
            series: [
              {
                name: "Revenue",
                data: [10, 100, 50, 70, 80, 30, 40],
              },
            ],
          },
          {
            title: "Expenses",
            color: {
              backGround:
                "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
              boxShadow: "0px 10px 20px 0px #F9D59B",
            },
            barValue: 60,
            value: "4,270",
            png: UilClipboardAlt,
            series: [
              {
                name: "Expenses",
                data: [10, 25, 15, 30, 12, 15, 20],
              }
              ]
            }
            ]


export const UpdatesData = [
  {
    img:img1,
    name:'Riley Thomas',
    note: " has ordered Apple Iphone XR.",
    time: "1 min ago"
  },
  {
    img:img2,
    name:'Leonard Nimoy',
    note:' has received the Nike Air Shoes.',
    time:"30 mins ago",
  },
  {
    img:img3,
    name:'Mikasa Ackerman',
    note:' has ordered the Park Avenue Soap',
    time:'1 hour ago',

  },
 

]