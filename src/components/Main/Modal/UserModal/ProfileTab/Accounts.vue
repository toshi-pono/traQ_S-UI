<template>
  <section>
    <profile-header text="アカウント" />
    <p v-if="showWikiPageLink" :class="$style.p">
      <circle-icon
        name="book"
        mdi
        :color="iconColor"
        :background="iconBackgroundColor"
        :class="$style.icon"
      />
      <a :href="wikiPageLink" target="_blank" @click.stop="">
        {{ wikiPageName }}
      </a>
    </p>
    <p v-if="twitterId !== ''" :class="$style.p">
      <circle-icon
        name="twitter"
        mdi
        :color="iconColor"
        :background="iconBackgroundColor"
        :class="$style.icon"
      />
      <template v-if="twitterId === undefined">Now Loading...</template>
      <template v-else>
        <a :href="twitterLink" target="_blank" @click.stop="">
          @{{ twitterId }}
        </a>
      </template>
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import store from '@/store'
import ProfileHeader from './ProfileHeader.vue'
import CircleIcon from '@/components/UI/CircleIcon.vue'

export default defineComponent({
  name: 'Accounts',
  props: {
    bot: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    twitterId: String
  },
  setup(props) {
    const iconBackgroundColor = computed(
      () => store.getters.app.themeSettings.currentTheme.ui.primary
    )
    const iconColor = computed(
      () => store.getters.app.themeSettings.currentTheme.background.primary
    )

    const showWikiPageLink = computed(() => location.host === 'q.trap.jp') // 簡易的にhost名で分岐させてる
    const wikiPageName = computed(() => {
      if (props.bot) {
        return `bot/${props.name.replace(/^BOT_/, '')}`
      }
      return `user/${props.name}`
    })
    const wikiPageLink = computed(
      () => `https://wiki.trap.jp/${wikiPageName.value}`
    )
    const twitterLink = computed(
      () => `https://twitter.com/${props.twitterId ?? ''}`
    )
    return {
      iconColor,
      iconBackgroundColor,
      showWikiPageLink,
      wikiPageName,
      wikiPageLink,
      twitterLink
    }
  },
  components: {
    ProfileHeader,
    CircleIcon
  }
})
</script>

<style lang="scss" module>
.p {
  margin: 8px 0;
}
.icon {
  margin-right: 4px;
  vertical-align: bottom;
}
</style>
