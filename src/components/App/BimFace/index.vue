<template>
  <div ref="refBimFace" class="bim-face-view"></div>
</template>

<script>
/* eslint-disable */
/*
    BimfaceSDKLoaderConfig          loader配置
            dataEnvType             默认使用 BimfaceEnvOption.Local
            sdkPath                 sdk路径
            path                    viewToken.json路径
    BimfaceSDKLoader                SDKLoader
    Glodon                          Glodon 我也不知道这是什么东西
*/

export default {
  name: "BimFace",
  components: {},
  props: {},
  data() {
    return {
      viewer: null,
      loaderConfig: new BimfaceSDKLoaderConfig(),
      path:
        "http://192.168.8.203:20000/models/c3b3542aefcc04170d0b5577dd0e00ba/viewToken.json",
    };
  },
  mounted() {
    this.loaderConfig.path = this.path;
    this.loaderConfig.sdkPath = "/sdk/bimface";
    this.loaderConfig.dataEnvType = BimfaceEnvOption.Local;
    BimfaceSDKLoader.load(this.loaderConfig, this.loadSuccess, this.loadFailed);
  },
  methods: {
    loadSuccess(data) {
      const view = this.$refs.refBimFace;
      if (data.viewType == "drawingView") {
        var WebAppConfig = new Glodon.Bimface.Application.WebApplicationDrawingConfig();
        WebAppConfig.domElement = view;
        var app = new Glodon.Bimface.Application.WebApplicationDrawing(
          WebAppConfig
        );

        this.viewer = app.getViewer();
        this.viewer.addModel(data);
      } else if (data.viewType == "3DView") {
        var config = new Glodon.Bimface.Application.WebApplication3DConfig();
        config.domElement = view;
        var eventManager = Glodon.Bimface.Application.WebApplication3DEvent;
        app = new Glodon.Bimface.Application.WebApplication3D(config);
        this.viewer = app.getViewer();
        this.viewer.addModel(data);
        this.viewer.showExclusiveComponentsByObjectData([
          { specialty: "给排水" },
          { specialty: "暖通" },
        ]);
      } else if (data.viewType == "rfaView") {
        var config = new Glodon.Bimface.Application.WebApplicationRfaConfig();
        config.domElement = view;
        var eventManager = Glodon.Bimface.Application.WebApplicationRfaEvent;
        app = new Glodon.Bimface.Application.WebApplicationRfa(config);
        this.viewer = app.getViewer();
        this.viewer.addModel(data);
      }
    },
    loadFailed() {
      console.log("Failed to load SDK!");
    },
  },
};
</script>
<style lang="scss" scoped>
.bim-face-view {
  width: 100%;
  height: 100%;
}
</style>
