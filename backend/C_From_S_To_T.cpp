#include <bits/stdc++.h>
using namespace std;
#define ll long long 
int main(){
ll t;
cin>>t;
while(t--){
string s,t,p;
cin>>s;
cin>>t;
cin>>p;
map <char,int> m;
map <char,int> m1;
map <char,int> m2;
for(int i=0;i<s.size();i++){
m[s[i]]++;
}
for(int i=0;i<t.size();i++){
m1[t[i]]++;
}
for(int i=0;i<p.size();i++){
m2[p[i]]++;
}
ll c=0;

for(int i=0;i<t.size();i++){
   
if((m2[t[i]]+m[t[i]])<m1[t[i]]){
c++;
}
} 
ll pos=0;
for(int i=0;i<t.size();i++){
   if(m[s[i]]>m1[s[i]]){
     c++;
   }
   if(s[pos]==t[i]){
    pos++;
   }

} 
if(pos!=s.length()){
    c++;
}






if(c>0){
    cout<<"NO"<<endl;
}
else cout<<"YES"<<endl;





 }
}