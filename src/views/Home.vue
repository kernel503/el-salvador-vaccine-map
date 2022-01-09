<template>
  <div class="home">
    <l-map
      ref="map"
      v-model="zoom"
      v-model:zoom="zoom"
      :center="[13.8, -88.9]"
      :layers="['Stadia.AlidadeSmoothDark']"
    >
      <l-tile-layer
        v-for="provider in leafletProviders"
        :key="provider.name"
        :name="provider.name"
        :visible="provider.visible"
        :url="provider.url"
        :attribution="provider.attribution"
        layer-type="base"
      />

      <l-control-layers />

      <l-layer-group
        v-for="[country, places] in providers"
        :key="country"
        :name="country"
        :visible="country === 'San Salvador'"
        layer-type="overlay"
      >
        <l-marker
          v-for="provider in places"
          :key="provider.address"
          :lat-lng="[provider.location.latitude, provider.location.longitude]"
        >
          <l-icon
            icon-url="https://cdn.frankerfacez.com/static/emoji/images/twemoji/1f489.png"
            :icon-size="[45, 45]"
          />
          <l-popup>
            <h1>{{ provider.name }}</h1>
            <h3>{{ provider.address }}</h3>
          </l-popup>
        </l-marker>
      </l-layer-group>
    </l-map>
  </div>
</template>

<script>
import {
  LMap,
  LIcon,
  LMarker,
  LTileLayer,
  LPopup,
  LControlLayers,
  LLayerGroup,
} from '@vue-leaflet/vue-leaflet';

import { ref } from 'vue';
import places from '../places';

const leafletProviders = [
  {
    name: 'OpenStreetMap',
    visible: true,
    attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
  {
    name: 'Stadia.AlidadeSmoothDark',
    visible: false,
    url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  },
];

export default {
  name: 'Home',

  components: {
    LMap,
    LTileLayer,
    LIcon,
    LMarker,
    LPopup,
    LControlLayers,
    LLayerGroup,
  },

  setup() {
    const zoom = ref(9);
    const map = ref(null);

    function fly({ latitude, longitude }) {
      map.value.leafletObject.flyTo([latitude, longitude], 11);
    }

    return {
      zoom,
      map,
      leafletProviders,
      providers: places,
      fly,
    };
  },
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
}
</style>
