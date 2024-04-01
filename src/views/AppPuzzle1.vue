<template>
<div class="content">
  <div class="grid-container">
    <div v-if="resultMessage" class="centered-div">{{ resultMessage }}</div>
  </div>

  <img v-for="(image, index) in images"
         :key="index"
         :src="image.src"
         :class="{'chosen': image.chosen, 'image': true}"
         @click="checkImage(image, index)"
         :style="{ top: image.position.top + 'px', left: image.position.left + 'px' }">

  <!-- Modal starts here -->
  <app-modal :puzzle-number="1" v-if="showModal">
      <p class="smaller-text">You are an impressive farmor.</p>
      <img src="@/assets/farmor2-min.png" class="exclude-style">
      <p class="smaller-text">You've found a sneak peek at Silo's upcoming collection, "The Farmors".</p>

      <p class="smaller-text">
        <strong>

      But here’s our question for you. Why is Sei the right home for Silo and our Farmors collection?
    </strong>
    </p>
    <p class="smaller-text">

      If you can’t guess, perhaps one or two of the high profile members of the Sei NFT community can help you. 😉
    </p>
    <p class="smaller-text">

      Tweet the following message at the twitter account(s) of the members of the Sei NFT community that you think might know the answer. If you figure out which one it is, they’ll reply to the question with the right answer for this puzzle: 
    </p>

    <div class="text-container">
      <p>
        “Hey Farmor, why is @SeiNetwork the best layer one blockchain for @Silo_Stake to build on? $sei $isei #thefarmors #thefarmorslaunchevent”
      </p>
    </div>
      <div class='copy-button'>
      <button @click="copyText" class="content__button">Copy Text</button>
    </div>

    <br>
    <p class="smaller-text">
      <i>

      Hint: they all have over 1000 followers, one is the Queen of Sei, one is a top tier grift buster, and one is at the Center of everything. 
    </i>
  <br>
      </p>
  </app-modal>


</div>
</template>

<script>
  import AppModal from "../components/AppModal";

function randRange(a, b) {
  return Math.random() * (b - a) + a;
}

const NUM_IMAGES = 135;
export default {
  name: "AppPuzzle1",
  components: {
    AppModal
  },
  data() {
    return {
      showModal:false,
      thetas: new Array(NUM_IMAGES).fill(null).map(() => randRange(0, Math.PI*2)),
      radii: new Array(NUM_IMAGES).fill(null).map(() => randRange(0.4, 1)),

      images: [
        { src: require("@/assets/resized/b5fc72c9106be0ae14de6142b116b785.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (30).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/6332b75485f2ddcc9487a7f4_nfts-bored-ape-yacht-club-819x1024.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/0111.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/Dada-Creeps-Weirdos-nfts-1024x1024.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/nft-header-3.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (29).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/monkey-g412399084_1280.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/what-is-nft-art-min.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/6332b7cabae696850dca1f0f_bored-ape-yacht-club-nft-artwork-81.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (14).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/yaka.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/nft-1623796240.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/ed3c1d6b03fd24090f59eee2bbb22eb4.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/mm-2022-03_OAA_NFT_1_X.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (32).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/penguin2.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (4).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/Pop-Art-NFT-Marilyn-Warhol-1280x720.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (12).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/v1_txt2img_30a8cac5-737f-4b99-8000-144c73f70185.png"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/penguin3.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/penguin1.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/beeple-nft-2021-03-11T155103Z_200460081_RC239M9WQEYC_RTRMADP.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (10).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/tamEIbX2-Kristel-Bechara-NFT-Artwork-Satoshi-Nakamoto-1-1200.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (6).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/nft-art-teens-1.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/nfts-transform-the-art-industry-main-1600.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/melaniabilustracion-No-Planet-B-square.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/image (8).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/cappys5.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (17).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/cbe346eee79d3e08dee5e8eb04284438.jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/Blog-Image-2.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (1).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/im-424811.jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/nft-art-gallery-600x375.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/cappys4.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/semen1.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/San-Jose-Feature.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/60424f3c2dc90100183559ca.jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/NFT-Art-Explained.jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/Nft.png"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/cappys6.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (31).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/NFT digital art.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (3).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/aeforia---prelude.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/art-nfts-auction-2021-esther-barend.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/Will-AI-Kill-The-Value-Of-NFT-artists-Or-Will-AI-Be-The-Savi.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (15).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/semen2.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/nft-2-scaled.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (28).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (11).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/56ac62890c7709023e2037addb4919917a4f27ad-1600x1067.png"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/cappys3.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/Stacy1.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/Art_Basel_Miami_Beach_tezos_11.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/image (9).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/Beeple-NFT-Art-Human-One.jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/cappys2.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/3_The_EverLasting_Beautiful_-_FEWOCiOUS_rzuxao.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (7).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (5).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/230-231-1_0.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/6cfaf1335f06b5d89ebe3c56ae97c6d97ba2699e.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/cappys1.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (13).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/nft-museum-in-seattle.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/cryptopunks.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (22).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/seiyan2.png"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/dob2.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/image (7).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/yaka2.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/NFT_Artists_on_the_Rise_creators2.jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/image (13).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (9).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/image (11).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/image (5).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/seiyan1.png"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/polina-kondrashova-fhrwah2hmnm-unsplash.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/dob1.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (20).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/1675803675-GettyImages-1312996884.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/s-l1600.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/Cooke_0322_1140x700.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (24).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/23wealth-superJumbo.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (19).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/bump1.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/BAYC-e1654613081200-600x388.jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/image (15).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/960x0.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/Most-popular-NFT-artists-to-follow-in-2023-1.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/NFT-Art-scaled.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/Chill-For-A-Sec-With-This-Carefree-Baby-Goat-788x1024.png"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/thumbNFT_Art_Market_Brian_Boucher_Koenig.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/image (3).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/bump2.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/https-__hypebeast-com_image_2021_03_First-NFT-Art-Gallery-Sp.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (26).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/d2caafb1-70da-47e2-ba48-efd66565cde1_w1024_r0-99752628324056.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/image (4).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/image (10).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/106983072-1638384838850-image3.png"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/cover NFT cript e block-NFT crypto_1657532522.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/ant1.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/influencer4.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (21).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (23).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/5NOWWNNEBRER7BXFZKCYRCA7NA.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/ant2.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/nft-image.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/image (12).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (8).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/image (6).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/The-16-most-expensive-NFT-artworks-ever-sold-PA.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/Art_NF_Ts_a_Revolution_in_the_Art_Industry_b4f8635b9e.png"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/influencer2.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/farmor1.jpg"), chosen: true, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/604f7608d2836f0018d47ba2.png"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/influencer3.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/nft-digital-art-auction-results.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/crypto-artist-banner_11zon.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/iStock-1353849355-scaled.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/images (18).jpeg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/influencer1.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/GettyImages-1325992711-e1627657112190.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/11nft-explain-1-mediumSquareAt3X.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/NFT-scaled-1066x440.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/nft_marfa.jpg"), chosen: false, position: { top: 0, left: 0 } },
        { src: require("@/assets/resized/image (14).jpeg"), chosen: false, position: { top: 0, left: 0 } },
      ],
      resultMessage: '',
    }
  },
  mounted() {
    this.positionImages();
    window.addEventListener('resize', this.positionImages);
    setInterval(this.updatePositions, 200);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.positionImages);
  },
  methods: {
    randRange(a, b) {
      return Math.random() * (b - a) + a;
    },
    lerp(x, a, b, c, d) {
      const scale = (x - a) / (b - a);
      return (d - c) * scale + c;
    },
    getImagePosition() {
      
    },
    positionImages() {
      const screen_width = window.innerWidth;
      const screen_height = window.innerHeight;
      const img_height = 100; // Fixed height for all images
      const img_width = 100; // Fixed width for all images

      this.images.forEach((image, i) => {
        const radius = this.radii[i];
        const theta = this.thetas[i];
        const x = Math.cos(theta) * radius;
        const y = Math.sin(theta) * radius;
        const left = this.lerp(x, -1, 1, 0, screen_width - img_width);
        const top = this.lerp(y, -1, 1, 0, screen_height - img_height);
        const max_jitter = 10;
        const jitter = Math.random() * max_jitter;
        this.images[i].position = {top: top + jitter, left: left+jitter};
      });
    },
    updatePositions() {
      this.thetas = this.thetas.map((theta) => theta + Math.random() * 0.1);
      this.positionImages();
    },

    checkImage(image, index) {
      let chosen = image.chosen;
      console.log(`Clicked image: ${index}`)
      this.resultMessage = "Hm...";
      setTimeout(() => {
        // just setting this for the moment.
        if(chosen) {
          //this.resultMessage = 'You found it!!!';
          this.showModal = true;
          this.resultMessage = '';

        } else {
          this.resultMessage = 'That is not the farmor you are looking for.';
        }
      }, 300);
    },
    copyText() {
      const textToCopy = `“Hey Farmor, why is @SeiNetwork the best layer one blockchain for @Silo_Stake to build on? $sei $isei #thefarmors #thefarmorslaunchevent”`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Text copied to clipboard!');
      }).catch(err => {
        console.error('Error copying text: ', err);
      });
    },
  }
};
</script>

<style scoped>
.content {
  padding: 7rem 2rem;
}
.content__heading {
  text-align: center;
  margin-bottom: 1rem;
}
.content__separator {
  border-color: gray;
  margin-bottom: 1rem;
}

.centered-div{
  background-color: #fff;
  padding: 8px;
  border: 4px solid #333;
  font-size: 2em;
  z-index: 20; 
}


img:not(.exclude-style) {
  max-height: 100px;
  max-width: 100px;
  position: absolute;
  z-index: 0;
}

*{
/*  font-family: sans-serif;*/
/*  font-weight: bold;*/
}

img:hover{
  border: 4px solid red;
}

.chosen:hover{
  border: 4px solid lightgreen;
}

.grid-container {
  display: grid;
  place-items: center; /* Shortcut for align-items and justify-items */
  height: calc(100vh - 150px); /* Fill the entire viewport vertically */
  width: 100vw; /* Fill the entire viewport horizontally */
  background-image: url('../assets/tile.png');
  background-repeat: repeat;

}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.clipboard-btn {
  align-self: flex-end; /* Align the button to the right */
  cursor: pointer;
  border: none;
  background-color: transparent;
}

.content__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 9999px; /* rounded-full */

  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: grey; 
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 30px; /* Adjust this value to control the roundness */
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  ring-offset-color: white;
  transition: color .15s ease-in-out;
  outline: none;
  --tw-ring-offset-width: 2px;
  --tw-ring-opacity: 1;
  opacity: 1; /* For enabled state */
  pointer-events: auto; /* For enabled state */

  height: 2.5rem; /* h-10 */
  padding: 0.5rem 1rem; /* px-4 py-2 */

}

.copy-button {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

</style>