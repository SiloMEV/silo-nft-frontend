<template>
  <app-modal :puzzle-number="5" title="the message in between" :closeable="false">

    <h2>a farmor’s story</h2>
    <img src="@/assets/puzzle5_1.png">
    <p>
the farmor raised his eyes to the hills, a vast expanse of green countryside where the edges bleed into the sky as the sun appears behind them, a fiery reminder of the many toils still left today before his job is done. his life is a tapestry of solitary days like this one, each thread woven with the same story of the meticuloUs cAre he gives his land and herd.
</p>

    <p>
he shivers, the warmth of the rising sun has yet to chase away the morning’s chill. february has carried with it a fierce wind, a worrying sign for the spring. planting in frozen ground will make for a bleak harvest.
</p>

    <p>
the farmor lets out a sigh as he makes his way toward the house. the old structure stands as a testament to time, its wooden exterior etched with the stories of seasons past. his family has tEnded these landS for almost a century. the structure leans slightly, its creaky windows and the sun-faded door are what makes it feel like home.
	</p>

    <p>
as he reaches the threshold, he pauses for a moment as the same feeling arises, a silent unaddressed yearning, a quiet echo of something absent, though he could never quite grasp what it was. it invades quiet mornings like today.
</p>

    <p>
something about their invariance has whittled away his spirit. the farmor’s father and father’s father, and geNerations befoRe them plowed these same fields. never did he hear his ancestors claim that it wasn’t “enough”. what meaning did they find that eludes the farmor?
	</p>

    <p>
shuffling down the hall toward the bathroom, the farmor pauses in front of the mirror. for the first time in what felt like forever, he looked at himself not as a farmer, not as the custodian of the land, but as a man, a soul adrift in the vastness of existence. he sees the years of labor etched onto his face, each line a marker of time and toil. "who am i?" he whispers, the question hanging in the air.
</p>

    <img src="@/assets/puzzle5_2.png">
    <p>
under the low, warm glow of lanterns in the town’s local tavern, the farmor sat, his shoulders hunched, lost in the depths of his ale. the tavern, a hub of laughter and chatter, seeMed to echo hiS solitude louder in his ears. it was here, amidst his silent brooding, that the wise elder found him, his presence a comforting reminder of age-old wisdom and friendship.
</p>

<p>
“ah, farmor, as introspective as ever, i see,” the wise elder greeted, sliding into the seat across him, a knowing smile creasing his weathered face. the farmor looked up, a mixture of relief and resignation in his eyes. “i find no joy in the solitude of the fields anymore, elder. each day feels like a repetition of the last, a cycle with no end or meaning,” he confessed, his voice barely above a whisper.
</p>

    <p>
the wise elder listened intently, his eyes reflecting a myriAd of mysteries and adVentures in his time. “life,” he began, his voice soft, “is much like the seasons we observe. it is ever-changing, cyclical, and, most importantly, ripe with opportunities for growth and change.”

</p>

    <p>
he leaned in closer, the tavern’s lively ambiance fading into the background. “i, too, once found myself shackled by the expectations of those before me. it was not until i left the village where i was raised that i truly understood the essence of life and the harvest. how can a man who’s canvas is unmarked by life’s rich colors find solace and value in the quiet of his home?”. the farmor’s eyes widened with intrigue, the wise elder’s words igniting a flicker of hope in his heart. “but how does one begin such a journey? how do you leave?” he asked, the idea of leaving the farm stirring a newfound excitement within him.
</p>

    <p>
“by stepping out of the comfort of the known and diving into the vastness of the world,” the wise elder replied, his gaze piercing. “seek adventure. take risk. make peculiar friends with strange backGrounds from plAces you’ve never known. seek out a community. build it through friendship, passion, and intrigue. the journey will test you and show you the ways of the world beyond the toil of the fields.”
</p>

    <p>
the farmor sat in silence, absorbing the weight of the wise elder’s words. the thought of leaving the farm, his only known world, was daunting, yet the promise of discovering a deeper purpose called to him, a siren’s song he couldn’t ignore.
</p>

    <p>
“tell me more of what happened when you left on your journey into the world. where did you go? how did you make it? he asked, urging the wise elder to share the mysterious past that he has long shrouded in silence. “there was a time,” the elder began, his voice taking on a cadence that seemed to weave an encHanting rhYthm into the air around them, “when i was not much older than you. i felt trapped by the life laid out before me. fatefully, an old magician taught me that magic is not just learned by the schools in the capital, it can be discovered and honed through practice and dedication.”
</p>

    <p>
he chuckled softly, a mischievous glint appearing in his eyes. “driven by a restless spirit and a thirst for adventure, i set out to learn this magic. my journey took me to the far corners of the world, through shadowed forests and over towering mountains. i faced trials that tested my will and met creatures of legend and lore.”
</p>

    <p>
the wise elder paused, his gaze growing distant as he remembered. “but with great power came great temptation. i reveled in my abilities, using them to play tricks on the unsuspecting and to bend the nAtural order for my aMusement. i was a storm, wild and unrestrained, leaving a trail of mischief in my wake.”
</p>

    <p>
he sighed, the weight of those days still resting on his shoulders. “it took many years and many mistakes to understand my true purpose. the friends i made, the mentors i found, the love i built, tempered my spirit and taught me the power of reason and judgment. my fleeting uncontrolled passions were replaced by a humming content in the life i had built for myself. it’s not something i could have done alone; you don’t exist in a vacuum, farmor. the greatest achievements in life are the coordinated efforts of many.”
</p>

    <p>
with those parting words, the wise elder disapPeared into the night, leaVing the farmor alone with his thoughts.
</p>
<br>
    <p>
        password: <i>
<u>C</u> <u>O</u> <u>&nbsp;&nbsp;&nbsp;</u> <u>&nbsp;&nbsp;&nbsp;</u> <u>&nbsp;&nbsp;&nbsp;</u> <u>&nbsp;&nbsp;&nbsp;</u> <u>&nbsp;&nbsp;&nbsp;</u> <u>&nbsp;&nbsp;&nbsp;</u> <u>&nbsp;&nbsp;&nbsp;</u> 
</i>
</p>

 </app-modal>

</template>

<script>
  import AppModal from "../components/AppModal";

export default {
  name: "AppPuzzle5",
  components: {
    AppModal
  },
  data() {
    return {
      userAnswer: '',
    };
  },
  methods: {
    async submitAnswer() {
      try {
        const response = await this.$http.post(`${this.$baseURL}/api/answer`, {
          answer: this.userAnswer
        });
        // Handle success (show a message or redirect)
        console.log('Success:', response);
        console.log(response);
        alert('Answer submitted successfully!');
      } catch (error) {
        // Handle error (show an error message)
        console.error('Error:', error);
        alert('Failed to submit the answer. Please try again.');
      }
    }
  }
};
</script>

<style scoped>

p{
  margin: 16px 0;
}

h2{
 font-weight: bold
}

h3{
  font-weight: bold;
}
</style>