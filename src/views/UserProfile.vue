<template>
    <div class="user-profile">
      <div class="user-profile_user-panel">
        <h1 class="user-profile_username">@{{ state.user.username }}</h1>
        <div class="user-profile_admin-badge" v-if="state.user.isAdmin">
          Admin
        </div>
        <div class="user-profile_admin-badge" v-else>
          Not Admin
        </div>
        <div class="user-profile_follower-count">
            <strong>Followers: </strong> {{ state.followers }}
        </div>
        <form class="user-profile_create-twoot" @submit.prevent="createNewTwoot"
          :class="{'--exceeded': newTwootCharacterCount > 255 }">
          <label for="newTwoot"><strong>New Twoot</strong> ({{newTwootCharacterCount}}/255)</label> 
          <textarea id="newTwoot" rows="4" v-model="state.newTwoot"/>
          <div class="user-profile_twoot-type">
            <label for="newTwoot"><strong>Type: </strong></label>
            <select id="newTwootType" v-model="state.selectedTwootType">
              <option :value="option.value" 
                v-for="(option, index) in state.twootTypes" 
                :key="index">
                {{ option.name }}
              </option>
            </select>
          </div>
          <button> Twoot! </button>
        </form>
      </div>
      <div class="user-profile_twoots-wrapper">
        <Twoot 
          v-for="twoot in state.user.twoots" 
          :key="twoot.id" 
          :username="state.user.username"
          :twoot="twoot" 
          @favorite="toggleFavorite" 
        />
        <!-- @favorite when child emits this, run togglefavorite -->
      </div>
    </div>
</template>

<script>
import { onMounted, reactive, watch} from 'vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

import Twoot from '../components/Twoot'

export default {
  name: 'UserProfile',
  components: {
    Twoot
  },
  setup() {
    const state = reactive({
      followers: 0,
      user: {
        id: 1,
        username: '_chrisBalcita001',
        firstName: 'Christopher',
        lastName: 'Balcita',
        email: 'chris.x2pher@gmail.com',
        isAdmin: true,
        twoots: [
          { id: 1, content: "Twotter is cool! "},
          { id: 2, content: "Don't forget to subscribe here! "}
        ]
      },
      newTwoot: '',
      selectedTwootType: 'instant',
      twootTypes: [
        {value: 'draft', name: 'Draft'},
        {value: 'instant', name: 'Instant Twoot'}
      ]
    });
    const route = useRoute();
    const userId = computed( () => route.params.userId);
    const newTwootCharacterCount = computed( () => state.newTwoot.length )

    watch(
      () => state.followers,
      (current, previous) => {
        if(current > previous) {
          console.log(state.user.username + ' has gained a follower!');
        }
      }
    );

    function followUser() {
      state.followers++;
    }

    function createNewTwoot() {
      if (state.newTwoot && state.selectedTwootType !== 'draft') {
        state.user.twoots.unshift( {
          id: state.user.twoots.length + 1,
          content: state.newTwoot
        })
        state.newTwoot='';
      }
    }

    function toggleFavorite(id) {
        console.log('Favorited Tweet with id ' + id);
    }

    onMounted( () => {
      followUser();
    })

    return {state, route, userId, newTwootCharacterCount, 
        followUser, createNewTwoot, toggleFavorite};
  }


}

</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  padding: 50px 5%;

  .user-profile_user-panel {
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #dfe3e8;

    h1 {
      margin: 0;
    }

    .user-profile_admin-badge {
      background: rebeccapurple;
      color: white;
      border-radius: 5px;
      margin-right: auto;
      padding: 0 10px;
      font-weight: bold;
    
    }

    .user-profile_create-twoot {
      padding-top: 20px;
      display: flex;
      flex-direction: column;

      &.--exceeded {
        color: red;
        
        button {
          border-color: red;
        }
      }
    }
  }
}

.user-profile_twoots-wrapper {
  display: grid;
  grid-gap: 10px;
}



</style>
