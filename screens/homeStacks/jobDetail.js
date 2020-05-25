import React from "react";
import { View, Text, Image } from "react-native";
import ContainerFluid from "../../shared/containerFluid";
import { images } from "../../styles/globalStyles";
import AppText from "../../shared/appText";
import JobApplyBtn from "../../shared/jobApplyBtn";
import Icon from "../../shared/icon";

function JobDetail() {
     return (
       <ContainerFluid>
         <View>
           <Image
             source={images.logo}
             height={100}
             width={100}
             style={styles.companyLogo}
           />
         </View>
         <View>
           <AppText size={22} title="Web Developer" />
           <AppText size={18} title="ABC Comapny" />
           <View style={{marginLeft: 15}}>
               <View style={globalStyles.rowAlignCenter}>
                 <Icon name="location-on" size={14} color="#666666" />
                 <AppText
                   title={job.address}
                   color="secondary"
                   size={13}
                   css={{ marginLeft: 5 }}
                 />
               </View>
               <View style={globalStyles.rowAlignCenter}>
                 <Icon name="attach-money" size={14} color="#666666" />
                 <AppText
                   title={job.salary}
                   color="secondary"
                   size={13}
                   css={{ marginLeft: 5 }}
                 />
               </View>
           </View>
         </View>
         <JobApplyBtn/>
       </ContainerFluid>
     );
}

export default JobDetail;
