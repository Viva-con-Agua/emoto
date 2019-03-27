<template>
  <div class="Settings">
    <h1> Allgemeine Informationen</h1>
    <p>Lorem ipsum dolor sit amet, sit tale utroque commune at, eum perfecto legendos ne. Cu pro sale volutpat, etiam soluta primis no qui. Eam et quis elit, no soleat aliquando forensibus eum. Et sed quem vidit tollit, ne copiosae inimicus cum.</p>
    <p>Eros aliquando eloquentiam ius id, vel ex nulla cetero persequeris, congue dolore alterum te pro. Errem ubique philosophia mel ei, ex eros laoreet disputationi cum, quo duis facer at. No veri lucilius legendos mel, mel omnis delectus eu. Te vix inani legere, ex esse erat repudiare vix.</p>
    <p>Mea nullam laoreet assentior no, eam ut legendos volutpat, cum vocibus ponderum convenire ex. Nibh mucius eu per, quo offendit gloriatur id. Aeterno consequat accommodare ea usu, nominavi maiestatis deterruisset eam te, vel graecis legendos accusamus ad. Latine vocibus praesent ne eos. Nihil adolescens eos in, eum utinam delenit ei, qui principes inciderint ne.</p>
    <p>Pri et erant volutpat, nam alii clita no. At sea doctus quaestio, at aliquip labitur per. Est officiis accommodare te. Dolorem gubergren rationibus ei est, ius te persecuti efficiendi, te clita fastidii theophrastus sed. Ea partem graeci dicunt eam, ex vim imperdiet accommodare, eu est mentitum epicurei philosophia.</p>
    <p>Torquatos interpretaris et quo. His minim euripidis evertitur ea, cum veri munere tritani ei. Utinam complectitur pro eu, odio suscipiantur ea nam. Ut nam melius fabulas platonem, eu vero brute sed. Per cu scribentur consequuntur. Dolorem sensibus persequeris vix et.</p>

    <h1> Datenschutz</h1>
    <el-form ref="form" :model="form">
      <el-form-item label="Anonymisierte statische Auswertungen">
        <el-switch v-model="form.statistic"></el-switch>
      </el-form-item>
      <el-form-item label="Anonymisierte inhaltliche Auswertung">
        <el-switch v-model="form.content"></el-switch>
      </el-form-item>
    
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Speichern</el-button>
        <el-button @click="reset">Zurücksetzen</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Settings',
  data() {
    return {
      form:{
        content: false,
        statistic: false
      }
    }
  },
  methods: {
    reset: function(){
      this.form.content = false;
      this.form.statistic = false;
    },
    onSubmit: function(){
      return;
    }
  }
}
</script>

<style scoped>
p {
  text-align:left;
}
</style>