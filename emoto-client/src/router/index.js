import Vue from 'vue'
import Router from 'vue-router'

import MoodInquiryComponent from '@/views/MoodInquiry'
import MoodPictureInfo from '@/views/MoodPictureInfo'
import MoodCourse from '@/views/MoodCourse'
import Settings from '@/views/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing Page',
      component: Settings
    },
    {
      path: '/settings',
      name: 'Info and Settings',
      component: Settings
    },
    {
      path : '/mood/last',
      name : 'Mood Picture',
      component: MoodPictureInfo
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
        window.location = "http://localhost/arise/#/signin"
      }
    }
  ]
})