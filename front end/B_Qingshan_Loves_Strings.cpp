#include <bits/stdc++.h>
using namespace std;
#define ll long long

int main(){
ll t;
cin>>t;
while(t--)
{
ll n,m;
cin>>n>>m;
string sa;
cin>>sa;
string sb;
cin>>sb;
 ll k=0;
for(int i=0;i<m-1;i++){
if(sb[i]==sb[i+1]){
k++;
}
}  
if(n==1){
    cout<<"YES"<<endl;
}

 else if (((sa.find("11") != string::npos) && (sa.find("00") != string::npos)) ){
    cout<<"NO"<<endl;
 }
 else if(
    (sa.find("11") != string::npos)) {
        if(k>0){
           cout<<"NO"<<endl;
        }
else if(sb[0]=='0' && sb[m-1]=='0'){
    cout<<"YES"<<endl;
}
else{
    cout<<"NO"<<endl;
}

    }
    else if(sa.find("00") != string::npos){
         if(k>0){
           cout<<"NO"<<endl;
        }
       else if(sb[0]=='1' && sb[m-1]=='1'){
    cout<<"YES"<<endl;
}
else{
    cout<<"NO"<<endl;
}


    }
    else{
        cout<<"YES"<<endl;
    }








}







}