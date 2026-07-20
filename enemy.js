/*==========================================================
    Arena Battle 3D
    enemy.js FINAL

    Sistem:
    - Enemy Hero 3D
    - Chase AI
    - Attack
    - HP
    - Death
==========================================================*/


"use strict";



const Enemy={


    name:"Dark Knight",


    mesh:null,


    hp:500,


    maxHp:500,


    speed:2,


    damage:20,


    attackRange:2.5,


    attackCooldown:1.2,


    timer:0,


    alive:true



};









/*==========================================================
    CREATE ENEMY HERO
==========================================================*/


function createEnemy(){



    if(Enemy.mesh)

        return;





    const enemy =
    new THREE.Group();





    // ARMOR

    const armor =
    new THREE.Mesh(

        new THREE.CylinderGeometry(

            0.55,

            0.7,

            1.3,

            12

        ),

        new THREE.MeshStandardMaterial({

            color:0x880000,

            metalness:0.7

        })

    );


    armor.position.y=1.2;


    enemy.add(armor);








    // HEAD

    const head =
    new THREE.Mesh(

        new THREE.SphereGeometry(

            0.38,

            16,

            16

        ),

        new THREE.MeshStandardMaterial({

            color:0xffc49b

        })

    );


    head.position.y=2.2;


    enemy.add(head);








    // HELM

    const helmet =
    new THREE.Mesh(

        new THREE.SphereGeometry(

            0.42,

            12,

            12

        ),

        new THREE.MeshStandardMaterial({

            color:0x111111

        })

    );



    helmet.scale.y=0.5;


    helmet.position.y=2.45;


    enemy.add(helmet);







    // PEDANG

    const sword =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            0.12,

            1.5,

            0.15

        ),

        new THREE.MeshStandardMaterial({

            color:0xffffff,

            metalness:1

        })

    );


    sword.position.set(

        0.8,

        1.2,

        0

    );


    sword.rotation.z=-0.5;


    enemy.add(sword);







    enemy.position.set(

        0,

        0,

        -8

    );



    enemy.castShadow=true;



    scene.add(enemy);




    Enemy.mesh=enemy;



}









/*==========================================================
    AI
==========================================================*/


function updateEnemy(dt){



    if(

        !Enemy.mesh ||

        !Enemy.alive ||

        !Player.mesh

    )

    return;





    const dx=

    Player.mesh.position.x -

    Enemy.mesh.position.x;





    const dz=

    Player.mesh.position.z -

    Enemy.mesh.position.z;





    const distance=

    Math.sqrt(

        dx*dx+

        dz*dz

    );







    if(distance >

    Enemy.attackRange){



        Enemy.mesh.position.x +=

        dx/distance *

        Enemy.speed *

        dt;



        Enemy.mesh.position.z +=

        dz/distance *

        Enemy.speed *

        dt;




        Enemy.mesh.rotation.y=

        Math.atan2(

            dx,

            dz

        );


    }



    else{



        Enemy.timer-=dt;




        if(Enemy.timer<=0){



            Enemy.timer=

            Enemy.attackCooldown;



            Player.hp-=

            Enemy.damage;




            if(Player.hp<0)

                Player.hp=0;



            updateUI();



        }


    }



}









/*==========================================================
    DAMAGE ENEMY
==========================================================*/


function damageEnemy(amount){



    if(!Enemy.alive)

        return;





    Enemy.hp-=amount;





    if(Enemy.hp<=0){



        Enemy.hp=0;


        Enemy.alive=false;




        if(Enemy.mesh){



            scene.remove(

                Enemy.mesh

            );


            Enemy.mesh=null;


        }





        if(typeof addMessage==="function"){



            addMessage(

                "Enemy Defeated"

            );


        }



    }





    updateUI();



}