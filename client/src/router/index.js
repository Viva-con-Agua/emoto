import Vue from 'vue'
import Router from 'vue-router'

import MoodInquiryComponent from '@/views/MoodInquiry'
import MoodPictureInfo from '@/views/MoodPictureInfo'
import MoodCourse from '@/views/MoodCourse'
import Settings from '@/views/Settings'
import LandingPage from '@/views/LandingPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing Page',
      component: LandingPage
    },
    {
      path: '/settings',
      name: 'Info and Settings',
      component: Settings
    },
    {
      path : '/mood/last',
      name : 'Last Mood Picture',
      component: MoodPictureInfo,
      props: true
    },
    {
      path : '/mood/form',
      name: 'Mood Inquiry',
      component: MoodInquiryComponent
    },
    {
      path : '/mood/course',
      name: 'Course of Mood',
      component: MoodCourse
    },
    {
      path: '/mood/:id',
      name: 'Mood Picture',
      component: MoodPictureInfo,
      props(route) {
        const props = {
          //Convert String to Number
          //Each part of the url is a string!
          id : Number(route.params.id)
        }
        return props;
      }
    },
    {
      path : '/signin',
      beforeEnter() {
        // Put the full page url including the protocol http(s) below
        //aHR0cDovL2xvY2FsaG9zdC9lbW90b3VpLyMvbW9vZC9mb3Jt = base64(/emoto/#/mood/form)
        window.location = "/arise/#/signin/L2Vtb3RvLyMvbW9vZC9mb3Jt"
      }
    }
  ]
})