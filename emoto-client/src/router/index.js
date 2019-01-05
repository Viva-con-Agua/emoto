import Vue from 'vue'
import Router from 'vue-router'

import MoodInquiryComponent from '@/components/MoodInquiry'
import MoodPicture from '@/components/MoodPicture'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/mood/last',
      name : 'Mood Picture',
      component: MoodPicture
    },
    {
      path : '/mood/form',
      name: 'Mood Inquiry',
      component: MoodInquiryComponent
    },
    {
      path : '/mood/course',
      name: 'Course of Mood'
    }
  ]
})