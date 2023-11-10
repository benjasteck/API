import { Injectable } from "@angular/core";
import {Box} from "../models";

@Injectable({
  providedIn: 'root'
})
export class State{
   public boxes: Box[] = [];
  public currentBox: Box = {};
}
