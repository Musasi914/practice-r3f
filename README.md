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
Uniforms の time state.clock.getElapsedTime()より time += delta がいいかも

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
CameraControls → OrbitControls よりもカメラの動きが滑らか
react-spring/three の使い方
MeshWobbleMaterial 揺れる　草とかよさそう

// lusion
やってること：x,y,z に[-10,10]を与えて、それぞれのオブジェクトに position の逆方向への力を加えて原点に移動させる。マウスの位置に透明な球体を配置して、衝突する

// ecctrl
onPointerDown={(e) => e.target.requestPointerLock()}　で画面を押すとカーソルがなくなる
Ecctrl ライブラリで 3D 内で簡単にキャラクターを動かせる

// monitors
肝：RenderTexture モデルにテキストのテクスチャを映す

// flyingbananas
・Detailed high,mid,low のジオメトリを使う
(パフォーマンス的には Instances の方が良い)
・イージングの式
<code>easing = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2)),</code>
（↓ ループの中で）
<code>Math.round(easing(i / count) \* depth)</code>
この式により、遠い位置のバナナが多くなる
・3D 空間内の特定の位置（[0, 0, -z]）から見たビューポートの幅と高さ
<code>const { viewport, camera } = useThree();</code>
<code>const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);</code>
遠い位置ほど視錘台が広がるため、ビューポートが大きくなる
バナナが上へ行くと下に移動するが、ビューポートを利用しているため無駄がない
・useState でオブジェクトを定義して初回レンダリングのみ計算される
・postprocessing の効果を使う場合は、flat を設定しないと効かない
・DepthOfField 　公式に乗ってない属性が

// t-shirt
・gl={{ preserveDrawingBuffer: true }}
バッファを手動でクリアまたは上書きされるまで保持するかどうか。デフォルトは false です。
・eventPrefix="client"
キャンバス ポインターの x/y イベントにキャストされるイベントプレフィックス デフォルトは"offset"
・eventSource 　イベントのソースを指定する。　上に div とかあったらそれを指定しないと pointer とか動いてくれない
上記２つ切り替えてみる

・Decal でテクスチャを貼れる 勝手にジオメトリの形になる
・maath ライブラリ damp3, dampE 　で動かす
position は Vector3 型　 → 　 damp3
rotation は Euler 型　 → 　 dampE
color は Color 型　 → 　 dampC
・easing.dampC(materials.lambert1.color, color, 0.25, delta); でシャツの色を変えてる
easing.dampC(shadows.current.getMesh().material.color,undefined,0.25,delta); で AccumulativeShadows の色を変えてる AccumulativeShadows の色を変えると影を映す plane も影の色も変わる
