import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetails from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leader';
import About from "./AboutComponent";
class Main extends Component {

  constructor(props) {
    super(props);
      this.state = {
          dishes: DISHES,
          comments: COMMENTS,
          promotions: PROMOTIONS,
          leaders: LEADERS
      };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

  render() {
      const DishWithId = ({match}) => {
          return(
              <DishDetails dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
          );
      };
      const HomePage = () => {
          return(
              <Home
                  dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                  promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                  leader={this.state.leaders.filter((leader) => leader.featured)[0]}
              />
          );
      }
      const AboutPage= ()=> {
          return (
              <About
                  leaders={this.state.leaders}
                  leaderDetails={this.state.leaders.filter((leader) => leader.description)}
              />
          );

      }
    return (
      <div>
          <Header />
          <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/contactus' component={Contact} />} />
              <Route exact path='/aboutus' component={AboutPage} />} />
              <Redirect to="/home" />

          </Switch>
        {/*<Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />*/}
      {/*  <div className="container">
        <DishDetails dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
      </div>*/}
          <Footer />
      </div>
    );
  }
}

export default Main;