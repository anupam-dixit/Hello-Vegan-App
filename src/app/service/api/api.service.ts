import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(data:any) {
    return this.http.post(environment.baseUrl + '/login', data);
  }

  signup(data:any) {
    return this.http.post(environment.baseUrl + '/signup', data);
  }

  countryCode(){
    return this.http.get(environment.baseUrl + '/countryCode')
  }

  sendForgotPasswordLink(data:any) {
    return this.http.post(environment.baseUrl + '/sendForgotPasswordLink', data);
  }

  dashboard(data:any) {
    return this.http.post(environment.baseUrl + '/dashboard', data);
  }

  profile(id:any, login_user_id:any) {
    return this.http.get(environment.baseUrl + '/profile?id=' + id+'&login_user_id='+login_user_id);
  }

  blog(data:any) {
    return this.http.post(environment.baseUrl + '/blog',data);
  }

  addBlog(data:any) {
    return this.http.post(environment.baseUrl + '/blogAdd', data);
  }

  addRecipe(data:any) {
    return this.http.post(environment.baseUrl + '/recipeAdd', data);
  }

  addEvent(data:any) {
    return this.http.post(environment.baseUrl + '/eventAdd', data);
  }

  blogDetails(id:any) {
    return this.http.post(environment.baseUrl + '/blogDetailsById', { post_id: id });
  }

  addBlogDetailComment(data:any) {
    return this.http.post(environment.baseUrl + '/blogInsertComment', data)
  }

  addNewsDetailComment(data:any) {
    return this.http.post(environment.baseUrl + '/newsInsertComment', data)
  }

  news() {
    return this.http.get(environment.baseUrl + '/news');
  }

  newsDetails(id:any) {
    return this.http.post(environment.baseUrl + '/newsDetailsById', { news_id: id });
  }

  events() {
    return this.http.get(environment.baseUrl + '/event');
  }

  eventDetails(data:any) {
    return this.http.post(environment.baseUrl + '/eventDetailsById', data);
  }

  product(data:any) {
    return this.http.post(environment.baseUrl + '/product', data);
  }

  productDetail(id:any) {
    return this.http.post(environment.baseUrl + '/productDetailsById', { id: id });
  }

  recipes() {
    return this.http.get(environment.baseUrl + '/recipes');
  }

  recipeDetails(id:any) {
    return this.http.post(environment.baseUrl + '/recipesDetailsById', { id: id });
  }

  recipeShowAllComment(id:any) {
    return this.http.post(environment.baseUrl + '/recipeShowAllComment', { post_id: id });
  }

  restaurant() {
    return this.http.get(environment.baseUrl + '/restaurant');
  }

  profilePost(data:any) {
    return this.http.post(environment.baseUrl + '/profilePost', data);
  }
  profilePhoto(data:any){
    return this.http.post(environment.baseUrl + '/profilePhoto', data);
  }
  profileEvent(data:any) {
    return this.http.post(environment.baseUrl + '/profileEvent', data);
  }
  profileRecipe(data:any) {
    return this.http.post(environment.baseUrl + '/profileRecipe', data);
  }
  insertPostCommentUser(data:any){
    return this.http.post(environment.baseUrl + '/insert-post-comment-user', data);
  }
  profileBlog(data:any) {
    return this.http.post(environment.baseUrl + '/profileBlog', data);
  }
  dashboardDetail(id:any) {
    return this.http.post(environment.baseUrl + '/dashboardDetailsById', { post_id: id });
  }
  restudentInsertComment(data:any){
    return this.http.post(environment.baseUrl + '/restudentInsertComment', data);
  }
  restudentInsertLike(data:any){
    return this.http.post(environment.baseUrl + '/restudentInsertLike', data);
  }
  restudentShowAllComment(id:any){
    return this.http.post(environment.baseUrl + '/restudentShowAllComment', { post_id:id });
  }
  recommendation() {
    return this.http.get(environment.baseUrl + '/recommendation');
  }
  cook() {
    return this.http.get(environment.baseUrl + '/cook');
  }
  cookProfileById(data:any) {
    return this.http.post(environment.baseUrl + '/cookDetailsById',data);
  }
  notificationList(data:any) {
    return this.http.post(environment.baseUrl + '/notificationList', data);
  }

  notificationCount(data:any) {
    return this.http.post(environment.baseUrl + '/notificationCount', data);
  }

  notificationShow(data:any) {
    return this.http.post(environment.baseUrl + '/notificationShow', data);
  }

  dashboardInsertLike(data:any) {
    return this.http.post(environment.baseUrl + '/dashboardInsertLike', data)
  }

  about() {
    return this.http.get(environment.baseUrl + '/pages?pageName=about')
  }
  liveSearch(data:any) {
    return this.http.post(environment.baseUrl + '/liveSearch', data)
  }
  friendReqestSend(data:any) {
    return this.http.post(environment.baseUrl + '/friendReqestSend', data)
  }
  friendReqestList(id:any){
    return this.http.post(environment.baseUrl + '/friendReqestList', { user_id: id })
  }
  friendRequestConfirm(data:any) {
    return this.http.post(environment.baseUrl + '/friendRequestConfirm', data)
  }
  friendRequestDelete(data:any) {
    return this.http.post(environment.baseUrl + '/friendRequestDelete', data)
  }
  unfriend(data:any) {
    return this.http.post(environment.baseUrl + '/unfriend', data)
  }
  dashboardInsertComment(data:any) {
    return this.http.post(environment.baseUrl + '/dashboardInsertComment', data)
  }

  getChatUsers(data:any) {
    return this.http.post(environment.baseUrl + '/getChatUsers', data)
  }

  getChatGroups(data:any) {
    return this.http.post(environment.baseUrl + '/getChatGroups', data)
  }

  messageSendReceiveAll(data:any) {
    return this.http.post(environment.baseUrl + '/messageSendReceiveAll', data)
  }

  groupMessageSendReceiveAll(data:any) {
    return this.http.post(environment.baseUrl + '/groupMessageSendReceiveAll', data)
  }

  messageSend(data:any) {
    return this.http.post(environment.baseUrl + '/messageSend', data)
  }

  groupMessageSend(data:any) {
    return this.http.post(environment.baseUrl + '/groupMessageSend', data)
  }

  recipeInsertComment(data:any) {
    return this.http.post(environment.baseUrl + '/recipeInsertComment', data)
  }

  restaurantDetailsById(data:any) {
    return this.http.post(environment.baseUrl + '/restaurantDetailsById', data)
  }

  eventShowAllComment(id:any) {
    return this.http.post(environment.baseUrl + '/eventShowAllComment', { post_id: id })
  }
  eventInsertComment(data:any) {
    return this.http.post(environment.baseUrl + '/eventInsertComment', data)
  }
  eventIntrested(data:any){
    return this.http.post(environment.baseUrl + '/eventInsertGoingNotGoing', data)
  }
  eventInsertNotIntersted(data:any){
    return this.http.post(environment.baseUrl + '/eventInsertNotIntersted', data)
  }
  productShowAllComment(id:any) {
    return this.http.post(environment.baseUrl + '/productShowAllComment', { post_id: id })
  }
  productInsertComment(data:any) {
    return this.http.post(environment.baseUrl + '/productInsertComment', data)
  }
  profileUpdate(data:any) {
    return this.http.post(environment.baseUrl + '/profileUpdate', data)
  }
  userFriendList(id:any) {
    return this.http.post(environment.baseUrl + '/userFriendList', { user_id: id })
  }
  friendRequestCancel(data:any) {
    return this.http.post(environment.baseUrl + '/friendRequestCancel', data)
  }
  dashboardAddPost(data:any){
    return this.http.post(environment.baseUrl + '/dashboardAddPost', data)
  }
  privacy(){
    return this.http.get(environment.baseUrl + '/pages?pageName=privacy')
  }
  cookie(){
    return this.http.get(environment.baseUrl + '/pages?pageName=cookie')
  }
  advertising(){
    return this.http.get(environment.baseUrl + '/pages?pageName=advertising')
  }

  contactInsert(data:any){
    return this.http.post(environment.baseUrl + '/pages?pageName=contactInsert', data);
  }

  getMySubscription(data:any){
    return this.http.post(environment.baseUrl + '/getMySubscription', data);
  }
  post(url:string,data:any){
    return this.http.post(url, data);
  }
}
