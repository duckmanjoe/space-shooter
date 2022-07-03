namespace SpriteKind {
    export const Gas = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    darts = [assets.image`Dart1`, assets.image`Dart2`, assets.image`dart3`]
    projectile = sprites.createProjectileFromSprite(darts._pickRandom(), mySprite, 0, -100)
    projectile.startEffect(effects.fire, 100)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.spray, 100)
    otherSprite.destroy()
    info.changeScoreBy(1)
    if (info.score() == 10) {
        mySprite.sayText("+5 level up bonus", 2000, false)
        info.changeScoreBy(5)
        enemyspeed = 70
    }
    if (info.score() == 20) {
        mySprite.sayText("+10 level up bonus", 2000, false)
        info.changeScoreBy(10)
        enemyspeed = 100
    }
    if (info.score() == 45) {
        mySprite.sayText("+15 level up bonus", 2000, false)
        info.changeScoreBy(15)
        enemyspeed = 150
    }
    if (info.score() == 80) {
        mySprite.sayText("press press any button to win")
        thing = 1
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy()
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.spray, 500)
    scene.cameraShake(4, 500)
})
let myenemy: Sprite = null
let myfuel: Sprite = null
let projectile: Sprite = null
let darts: Image[] = []
let enemyspeed = 0
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
let thing = 0
scene.setBackgroundImage(assets.image`Galaxy`)
scroller.scrollBackgroundWithSpeed(0, 10)
thing = 0
mySprite = sprites.create(assets.image`Rocket`, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
animation.runImageAnimation(
mySprite,
assets.animation`Flying Rocket`,
100,
true
)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -30, 0)
enemyspeed = 50
game.onUpdateInterval(5000, function () {
    myfuel = sprites.createProjectileFromSide(assets.image`Fuel`, 0, 80)
    myfuel.x = randint(5, 155)
    myfuel.setKind(SpriteKind.Gas)
})
game.onUpdateInterval(2000, function () {
    myenemy = sprites.createProjectileFromSide(assets.image`Spider`, 0, enemyspeed)
    myenemy.x = randint(5, 155)
    myenemy.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    myenemy,
    assets.animation`Flying Spider`,
    100,
    true
    )
})
forever(function () {
    if (thing == 1 && controller.anyButton.isPressed()) {
        game.over(true)
    }
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
