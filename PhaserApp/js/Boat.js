class Boat {
    constructor(x, y, color) {
        this.boat = game.add.sprite(x, y,'boat_'+color);
        game.physics.p2.enable(this.boat);

        this.boat.body.angle = 90;
        this.velocity = 0;

        this.positions = [];
    }

    update(cursors) {
        // Update velocity
        if (cursors.up.isDown && this.velocity <= 400) {
            this.velocity += 7;
        }
        else if (cursors.down.isDown && this.velocity >= -400) {
            this.velocity -= 7;
        }
        else {
            if (this.velocity >= 7)
                this.velocity -= 7;
            if (this.velocity <= -7)
                this.velocity += 7;
        }

        // Set X and Y speed of velocity
        this.boat.body.velocity.x = this.velocity * Math.cos((this.boat.angle-90)*0.01745);
        this.boat.body.velocity.y = this.velocity * Math.sin((this.boat.angle-90)*0.01745);

        // Rotation of boat
        if (cursors.left.isDown) {
            this.boat.body.angularVelocity = -10*(this.velocity/1000);
        }
        else if (cursors.right.isDown) {
            this.boat.body.angularVelocity = 10*(this.velocity/1000);
        }
        else {
            this.boat.body.angularVelocity = 0;
        }

        // Save position
        this.savePosition();
    }

    reactFromMovement(mov) {
        this.velocity += mov.speed;
        this.boat.body.angularVelocity += mov.rotation;
        this.boat.body.angularVelocity += (mov.rotation > 0) ? + mov.speed/100 : - mov.speed/100;
        console.log("VELOCITY", this.velocity, "ANGULAR_VELOCITY", this.boat.body.angularVelocity);
    }

    getBoat() {
        return this.boat;
    }

    savePosition() {
        const time = Date.now();
        if (this.positions.length === 0 || time - this.positions[this.positions.length-1].time > 1000) {
            this.positions[this.positions.length] = {time: time, x: this.boat.x, y: this.boat.y};
        }
    }
}