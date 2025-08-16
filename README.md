55 章
bufferGeometry 　で１０個の三角形　できなかた
meshStandardMaterial で normal の計算できなかた

56
OrbitControls makeDefault
Html distanceTofactor center
Text 　 Text を詳しく知る際に必要なライブラリの説明
meshReflectionMaterial 鏡のような反射

57
debug ライブラリ Leva
パフォーマンスモニター perf

58
シーンの背景色 scene.background の設定方法　できなかた
影をつける　静的な場合、drei の BakeShadows
デフォルトの影がシャープなので drei の SoftShadows
リアル影　なんか体育館ぽい AccumulativeShadows
床と物体の距離に応じて薄くなったりする影　 ContactShadows
素晴らしい光　 Enviroment に LightFormer
Enviroment に ground で視点を低くできる
上記のすべてを包括できるのが Stage

59
gltfLoader で読み込んだモデルの複製 Clone
gltfLoader のアニメーション　できなかた
useAnimations(model.animations, model.scene)とする
gltf アニメーションの変化　 crossFadeFrom 　できなかた

60
matcapMaterial の存在忘れてた
Instances の使い方

61
bake, model 使い方
shaderMaterial の使い方

62
マウスイベント
パフォーマンスの優先 meshBounds
単純高速化　 BVH

63
postprocessing
すべての効果で mode, blendFunction 設定可 postprocessing からインポートして 公式乗ってない
toneMapping mode で調節
効果がオブジェクトの外だと効かないバグ →<color>で背景色つける

Vignette 四隅が暗くなるやつ
Bloom 輝く

CustomEffect 　必要性を感じないので飛ばした

64
PresentationControls カメラじゃなくてオブジェクトを動かす
touch-action none 推奨
drei の Html は、transfrom でカメラの方を向かないようにできる

// youtube
useProgress ローダー

// shopping
Outline などの対象を Selection Select で選択できる
useThree size で canvas サイズを取得できる
カメラがスムーズに動く
<code>
useFrame((state, delta) => {
easing.damp3(
state.camera.position,
[
state.pointer.x,
1 + state.pointer.y / 2,
8 + Math.atan(state.pointer.x * 2),
],
0.3,
delta
);
state.camera.lookAt(state.camera.position.x \* 0.9, 0, -4);
});
</code>
TiltShift2 ボケ　公式乗ってない
N8AO 影のぼかし　公式乗ってない
N8A0→SSAO
TiltShift2→DepthOfField
Mask,useMask マスク

// 3dCards
ScrollControls のなかで useScroll で情報取れる scroll.offset、useFrame でスクロール量に応じて物体を動かす
マウスでカメラを動かす。
<code>
easing.damp3(
state.camera.position,
[state.pointer.x * 2, state.pointer.y + 1.5, 10],
0.3,
delta
);
</code>
drei の Image
Image の radius は transparent 併用
cylinderGeometry の openEnded=false でリボン的な
ややこしい class 継承より shaderMaterial

// fishCamera
fishCamera 魚眼レンズみたいな
CameraControls / PerspectiveCamera ドラッグでもいける
react-spring/three の使い方
MeshWobbleMaterial 揺れる　草とかよさそう
