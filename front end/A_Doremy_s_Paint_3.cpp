#include <bits/stdc++.h>

using namespace std;
#define ll long long

int main(){
 ll t;
 cin>>t;
 while(t--){
ll n;
cin>>n;
ll a[n];
map<ll, ll>m;
for(int i=0;i<n;i++){
    cin>>a[i];
    m[a[i]]++;
}
if(n==2){
    cout<<"Yes"<<endl;
}
else if(m.size()==1){
    cout<<"Yes"<<endl;
}
else if(m.size()!=2){
    cout<<"No"<<endl;
}

else {
auto it=m.begin();
ll a=(*it).second;

it++;
ll b=(*it).second;

if(n%2 !=0){
if(a==((n/2)+1) || a==n/2){
    cout<<"Yes"<<endl;
}
else {
    cout<<"No"<<endl;
}
}
else if ( n%2==0 && a*2==n){
    
        cout<<"Yes"<<endl;
    
}
else{
    cout<<"No"<<endl;
}





}



 }




}