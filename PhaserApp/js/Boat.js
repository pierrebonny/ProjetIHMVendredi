class Boat {
    constructor(x, y, color, finishDetected) {
        this.boat = game.add.sprite(x, y,'boat_'+color);
        this.boat.width = 90;
        this.boat.height = 90;
        game.physics.p2.enable(this.boat);

        this.boat.body.angle = 90;
        this.velocity = 0;

        this.color = color;
        this.positions = [];

        this.finish = false;
        this.finishDetected = finishDetected;
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
            if (this.velocity >= 5)
                this.velocity -= 5;
            if (this.velocity <= -5)
                this.velocity += 5;
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

        if (this.boat.body.angularVelocity > 0) {
            this.boat.body.angularVelocity -= 0.05;
        } else if (this.boat.body.angularVelocity < 0) {
            this.boat.body.angularVelocity += 0.05;
        }

        // Save position
        this.savePosition();

        // Check finish
        this.checkFinish();
    }

    reactFromMovement(mov) {
        if (this.boat.body === null) {
            game.physics.p2.enable(this.boat);
        }
        this.velocity += mov.speed;
        this.boat.body.angularVelocity += mov.rotation/6;
        this.boat.body.angularVelocity += (mov.rotation > 0) ? + mov.speed/300 : - mov.speed/300;
        console.log("VELOCITY", this.velocity, "ANGULAR_VELOCITY", this.boat.body.angularVelocity);
    }

    getBoat() {
        return this.boat;
    }

    savePosition() {
        if (this.finish) return;

        const time = Date.now();
        if (this.positions.length === 0 || time - this.positions[this.positions.length-1].time > 100) {
            this.positions[this.positions.length] = {time: time, x: this.boat.x, y: this.boat.y};
        }
    }

    checkFinish() {
        if (!this.finish && this.boat.x > 1696) {
            this.finishDetected(this.color, this.positions);
            this.finish = true;
        }
    }

    hasFinished() {
        return this.finish;
    }
}